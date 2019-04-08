import React from "react";
import {
  HERO_CLIENT_Y,
  CLIENT_HEIGHT,
  HERO_HEIGHT,
  MAX_PAITICIPANTS_NUMBER
} from "../config";
// const fps = 30;
export default class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      currentCarId: 0
    };
    this.lastTime = 0;
  }

  componentDidMount() {
    this.trafficLoop();
    // this.mainLoop();
  }
  // mainLoop = time => {
  //   requestAnimationFrame(this.mainLoop);
  //   if (time - this.lastTime < 1000 / fps) {
  //     return;
  //   }
  //   let realFPS = 1000 / (time - this.lastTime);
  //   console.log("real fps", realFPS);
  //   // do something
  //   this.lastTime = time;
  // };
  trafficLoop = () => {
    const rand = Math.round(Math.random() * 6000) + 1000;
    this.timeout = setTimeout(() => {
      this.createTraffic();
      this.trafficLoop();
    }, rand);
  };

  createTraffic = () => {
    const { gameState } = this.props;
    const { currentCarId, participants } = this.state;
    if (gameState === 1 && participants.length < MAX_PAITICIPANTS_NUMBER) {
      this.setState({
        participants: [...participants, currentCarId + 1],
        currentCarId: currentCarId + 1
      });
    }
  };

  onFinish = id => {
    this.setState({
      participants: this.state.participants.filter(pid => pid !== id)
    });
  };

  onLose = id => {
    this.onFinish(id);
    this.props.onLose();
  };

  render() {
    const { participants } = this.state;
    const cars = participants.map(pid => (
      <Car
        carId={pid}
        key={pid}
        onFinish={this.onFinish}
        onLose={this.onLose}
        heroPos={this.props.heroPos}
        heroState={this.props.heroState}
      />
    ));
    return <div>{cars}</div>;
  }
}

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carSpeed: Math.random() * 3 + 3,
      carPos: Math.floor(Math.random() * 2),
      isHit: false
    };
    this.carRef = React.createRef();
    this.animationId = null;
  }
  componentDidMount() {
    this.animationId = requestAnimationFrame(this.mainLoop);
  }
  componentWillUnmount() {
    this.animationId && cancelAnimationFrame(this.animationId);
  }
  mainLoop = () => {
    const y = this.carRef.current.getBoundingClientRect().top;
    if (y >= CLIENT_HEIGHT) {
      this.props.onFinish(this.props.carId);
    } else if (
      this.state.carPos === this.props.heroPos &&
      y >= HERO_CLIENT_Y - HERO_HEIGHT
    ) {
      // console.log("crash", y, CLIENT_HEIGHT, HERO_CLIENT_Y);
      this.props.onLose(this.props.carId);
    } else {
      let top = y + this.state.carSpeed;
      if (this.props.heroState === 1) {
        top += 3;
      }
      this.carRef.current.style.top = top + "px";
      this.animationId = requestAnimationFrame(this.mainLoop);
    }
  };

  render() {
    const posList = ["left", "right"];
    const { carPos } = this.state;
    return <div className={`car ${posList[carPos]}`} ref={this.carRef} />;
  }
}
