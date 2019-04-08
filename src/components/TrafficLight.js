import React from "react";
import { HERO_CLIENT_Y, INITIAL_SPEED, CLIENT_HEIGHT } from "../config";
export default class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trafficType: 0, // 0绿灯，1红灯，2黄灯
      trafficLightId: 0,
      inScreen: false
    };
    this.trafficLightRef = React.createRef();
    this.intervalId = null;
  }
  componentDidMount() {
    this.trafficLoop();
    requestAnimationFrame(this.mainLoop);
    setInterval(() => {
      this.setState({
        trafficType: (this.state.trafficType + 1) % 3
      });
    }, 2000);
  }
  componentWillUnmount() {}

  mainLoop = time => {
    requestAnimationFrame(this.mainLoop);
    const { heroState, gameState } = this.props;
    const { trafficType, trafficLightId } = this.state;
    if (
      gameState === 1 &&
      heroState === 1 &&
      trafficLightId > 0 &&
      this.trafficLightRef.current
    ) {
      const top = this.trafficLightRef.current.getBoundingClientRect().top;
      const speed = INITIAL_SPEED + this.props.extraSpeed;
      this.trafficLightRef.current.style.top = top + speed + "px";
      if (top >= CLIENT_HEIGHT) {
        this.setState({ inScreen: false });
      } else if (trafficType !== 0 && top >= HERO_CLIENT_Y) {
        this.props.onLose("traffic light");
      }
    }
  };
  trafficLoop = () => {
    const rand = Math.round(Math.random() * 6000) + 3000;
    this.timeout = setTimeout(() => {
      this.createTraffic();
      this.trafficLoop();
    }, rand);
  };

  createTraffic = () => {
    const { heroState, gameState } = this.props;
    const { inScreen } = this.state;
    if (gameState === 1 && heroState === 1 && !inScreen) {
      this.setState({
        trafficLightId: this.state.trafficLightId + 1,
        inScreen: true
      });
    }
  };

  render() {
    const trafficTypes = ["green", "red", "yellow"];
    const { trafficLightId, trafficType } = this.state;
    const { heroState } = this.props;
    return (
      <div
        className={[
          "trafficlight",
          trafficLightId > 0 ? "" : "hidden",
          heroState === 1 ? "running" : "paused",
          trafficTypes[trafficType]
        ].join(" ")}
        key={trafficLightId}
        ref={this.trafficLightRef}
      />
    );
  }
}
