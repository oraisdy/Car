import React from "react";
import { SPEED_UP_TIME } from "../config";
export default class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upKeyDown: false
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }
  handleKeyDown(e) {
    const { heroPos, heroState } = this.props;
    e.preventDefault();
    switch (e.keyCode) {
      case 37: // 左
        heroState === 1 && this.props.onPosChange(Math.max(0, heroPos - 1));
        break;
      case 39: // 右
        heroState === 1 && this.props.onPosChange(Math.min(heroPos + 1, 1));
        break;
      case 38: // 上
        this.props.onStateChange(1);
        if (this.state.upKeyDown) {
          this.props.onSpeedUp();
        } else {
          this.setState({ upKeyDown: true });
          setTimeout(() => {
            this.setState({ upKeyDown: false });
          }, SPEED_UP_TIME);
        }
        break;
      case 40: // 下
        this.props.onStateChange(0);
        break;
      default:
        break;
    }
  }
  render() {
    const { heroPos, isHit, gameState, lifeInformer } = this.props;
    return (
      <div
        className={[
          "hero",
          heroPos === 0 ? "left" : "right",
          isHit ? "twinkling" : "",
          gameState === 1 ? "" : "hidden"
        ].join(" ")}
      >
        <div className={`life life${lifeInformer}`} />
      </div>
    );
  }
}
