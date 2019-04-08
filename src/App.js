import React from "react";
import "./styles/App.scss";
import Hero from "./components/Hero";
import Road from "./components/Road";
import Participants from "./components/Participants";
import TrafficLight from "./components/TrafficLight";
import {
  MAX_LIFE_NUMBER,
  HIT_INTERVAL,
  INITIAL_SPEED,
  SPEED_UP_TIME
} from "./config";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: -1, // 0结束，1行驶，-1未开始
      heroPos: 0, // 0左，1右
      heroState: 1, // 0停止，1行驶
      lifeInformer: MAX_LIFE_NUMBER,
      isHit: false,
      kilometers: 0,
      heroSpeed: INITIAL_SPEED
    };
    this.loseLife = this.throttledChangeInformer();
    this.speedUp = this.throttledChangeSpeed();
  }
  increaseKilometer = () => {
    if (this.state.gameState === 1 && this.state.heroState === 1) {
      this.setState({ kilometers: this.state.kilometers + 0.35 });
    }
  };

  throttledChangeInformer = () => {
    let canRun = true;
    return type => {
      if (!canRun) return;
      canRun = false;
      // console.log("IS HIT", type);
      this.setState({ isHit: true });
      if (this.state.lifeInformer <= 1) {
        this.gameOver();
      }
      this.setState({
        lifeInformer: this.state.lifeInformer - 1
      });
      setTimeout(() => {
        canRun = true;
        this.setState({
          isHit: false
        });
      }, HIT_INTERVAL);
    };
  };
  throttledChangeSpeed = () => {
    let canRun = true;
    return type => {
      if (!canRun) return;
      canRun = false;
      this.setState({ heroSpeed: this.state.heroSpeed + 3 });
      setTimeout(() => {
        canRun = true;
        this.setState({ heroSpeed: this.state.heroSpeed - 3 });
      }, SPEED_UP_TIME);
    };
  };
  gameOver = () => {
    this.setState({ gameState: 0 });
  };
  startGame = () => {
    this.setState({ gameState: 1 });
  };
  restartGame = () => {
    this.setState({
      gameState: 1,
      heroPos: 0, // 0左，1右
      heroState: 1, // 0停止，1行驶
      lifeInformer: MAX_LIFE_NUMBER,
      isHit: false,
      kilometers: 0
    });
  };

  render() {
    const {
      gameState,
      heroState,
      heroPos,
      lifeInformer,
      isHit,
      kilometers,
      heroSpeed
    } = this.state;
    const extraSpeed = Math.floor(kilometers / 7);
    return (
      <div>
        <div className="container">
          <Road
            heroState={heroState}
            extraSpeed={extraSpeed}
            heroSpeed={heroSpeed}
            increaseKilometer={this.increaseKilometer}
          />
          {gameState === 1 && (
            <div className="informer">{Math.floor(kilometers)}</div>
          )}
          <Hero
            isHit={isHit}
            gameState={gameState}
            heroState={heroState}
            heroPos={heroPos}
            lifeInformer={lifeInformer}
            onStateChange={state => {
              this.setState({ heroState: state });
            }}
            onPosChange={pos => {
              this.setState({ heroPos: pos });
            }}
            onSpeedUp={this.speedUp}
          />
          <TrafficLight
            gameState={gameState}
            heroState={heroState}
            extraSpeed={extraSpeed}
            heroSpeed={heroSpeed}
            onLose={this.loseLife}
            onGameOver={this.gameOver}
          />
          <Participants
            gameState={gameState}
            heroPos={heroPos}
            heroState={heroState}
            extraSpeed={extraSpeed}
            heroSpeed={heroSpeed}
            onLose={this.loseLife}
            onGameOver={this.gameOver}
          />
          {gameState === -1 && (
            <div className="startgame" onClick={this.startGame} />
          )}
          {gameState === 0 && (
            <div className="gameover">
              <ul>
                <li>你的成绩：{Math.floor(kilometers)} km</li>
                <li onClick={this.restartGame}>
                  <span className="restartgame" />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
