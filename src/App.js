import React from "react";
import "./App.scss";
import Hero from "./components/Hero";
import Road from "./components/Road";
import Participants from "./components/Participants";
import TrafficLight from "./components/TrafficLight";
import { MAX_LIFE_NUMBER, HIT_INTERVAL } from "./config";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: -1, // 0结束，1行驶，-1未开始
      heroPos: 0, // 0左，1右
      heroState: 1, // 0停止，1行驶
      lifeInformer: MAX_LIFE_NUMBER,
      isHit: false,
      kilometers: 0
    };
    this.loseLife = this.throttledChangeInformer();
    this.intervalId = null;
  }

  componentDidMount() {
    this.increseKilometers();
  }
  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId);
  }
  increseKilometers = () => {
    this.intervalId = setInterval(() => {
      if (this.state.gameState === 1 && this.state.heroState === 1) {
        this.setState({ kilometers: this.state.kilometers + 1 });
      }
    }, 2000);
  };

  throttledChangeInformer = () => {
    let canRun = true;
    return () => {
      if (!canRun) return;
      canRun = false;
      this.setState({ isHit: true });
      if (this.state.lifeInformer <= 0) {
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
      kilometers
    } = this.state;
    return (
      <div>
        <div className="container">
          <Road heroState={heroState} />
          {gameState === 1 && <div className="informer">{kilometers}</div>}
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
          />
          <TrafficLight
            gameState={gameState}
            heroState={heroState}
            onLose={this.loseLife}
            onGameOver={this.gameOver}
          />
          <Participants
            gameState={gameState}
            heroPos={heroPos}
            heroState={heroState}
            onLose={this.loseLife}
            onGameOver={this.gameOver}
          />
          {gameState === -1 && (
            <div className="startgame" onClick={this.startGame} />
          )}
          {gameState === 0 && (
            <div className="gameover">
              <ul>
                {/* <li className="title">游戏结束</li> */}
                <li>你的成绩：{kilometers} km</li>
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
