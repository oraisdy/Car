import React from "react";
import { getComputedTranslateY } from "../utils";
import { HERO_CLIENT_Y } from "../config";
import { setInterval } from "timers";
export default class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trafficType: 0, // 0绿灯，1红灯，2黄灯
      trafficLightId: 0,
      isHit: false
    };
    this.trafficLightRef = React.createRef();
    this.intervalId = null;
  }
  componentDidMount() {
    this.trafficLoop();
    this.intervalId = setInterval(() => {
      this.mainLoop();
    }, 10);
    setInterval(() => {
      this.setState({
        trafficType: (this.state.trafficType + 1) % 3
      });
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  mainLoop = () => {
    const { heroState, gameState } = this.props;
    const { trafficType } = this.state;
    if (
      gameState === 1 &&
      heroState === 1 &&
      trafficType !== 0 &&
      this.trafficLightRef.current &&
      getComputedTranslateY(this.trafficLightRef.current) >= HERO_CLIENT_Y
    ) {
      this.props.onLose();
      this.setState({ isHit: true });
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
    if (gameState === 1 && heroState === 1) {
      this.setState({
        trafficLightId: this.state.trafficLightId + 1,
        isHit: false
      });
    }
  };

  render() {
    const trafficTypes = ["green", "red", "yellow"];
    const { trafficLightId, trafficType, isHit } = this.state;
    const { heroState } = this.props;
    return (
      <div
        className={[
          "trafficlight",
          trafficLightId > 0 ? "" : "hidden",
          heroState === 1 ? "running" : "paused",
          trafficTypes[trafficType],
          isHit ? "twinkling" : ""
        ].join(" ")}
        key={trafficLightId}
        ref={this.trafficLightRef}
      />
    );
  }
}
