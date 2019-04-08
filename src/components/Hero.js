import React from "react";

export default class Hero extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
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
      <div>
        {gameState === 1 && (
          <div
            className={`hero ${heroPos === 0 ? "left" : "right"} ${
              isHit ? "twinkling" : ""
            }`}
          >
            <div className={`life life${lifeInformer}`} />
          </div>
        )}
      </div>
    );
  }
}
