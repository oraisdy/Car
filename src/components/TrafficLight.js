import React from "react";
import red from "../images/trafficlightred.png";
import yellow from "../images/trafficlightyellow.png";
import green from "../images/trafficlightgreen.png";
import { HERO_CLIENT_Y, CLIENT_HEIGHT } from "../config";
export default class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trafficType: 0, // 0绿灯，1红灯，2黄灯
      trafficLightId: 0,
      inScreen: false
    };
    this.trafficLightRef = React.createRef();
    this.animationId = null;
    this.intervalId = null;
    this.top = -60;
  }

  componentDidMount() {
    preload(red);
    preload(green);
    preload(yellow);
    this.trafficLoop();
    this.animationId = requestAnimationFrame(this.mainLoop);
    this.intervalId = setInterval(() => {
      this.setState({
        trafficType: (this.state.trafficType + 1) % 3
      });
    }, 2000);
  }
  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId);
    this.animationId && cancelAnimationFrame(this.animationId);
  }

  mainLoop = time => {
    this.animationId = requestAnimationFrame(this.mainLoop);
    const { heroState, gameState } = this.props;
    const { trafficType, trafficLightId } = this.state;
    if (heroState === 1 && trafficLightId > 0 && this.trafficLightRef.current) {
      this.top += this.props.heroSpeed + this.props.extraSpeed;
      this.trafficLightRef.current.style.top = this.top + "px";
      if (this.top >= CLIENT_HEIGHT) {
        this.setState({ inScreen: false });
      } else if (
        gameState === 1 &&
        trafficType !== 0 &&
        this.top >= HERO_CLIENT_Y
      ) {
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
      this.top = -60;
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
const preload = src => {
  let img = new Image();
  img.src = src;
  console.log(img);
};
