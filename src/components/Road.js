import React from "react";
import { INITIAL_SPEED } from "../config";
export default class Road extends React.Component {
  constructor(props) {
    super(props);
    const roadCol2 = new Array(10)
      .fill(0)
      .map((_, i) => <div key={i} className="road-block road-block-road1" />);
    const roadCol4 = new Array(10)
      .fill(0)
      .map((_, i) => <div key={i} className="road-block road-block-road3" />);
    const roadCol1 = new Array(10)
      .fill(0)
      .map((_, i) => <div key={i} className={getRandomClassName()} />);
    const roadCol5 = new Array(10)
      .fill(0)
      .map((_, i) => <div key={i} className={getRandomClassName()} />);

    this.state = {
      roadCol1,
      roadCol2,
      roadCol4,
      roadCol5
    };
    this.roadRef = React.createRef();
  }
  componentDidMount() {
    requestAnimationFrame(this.mainLoop);
  }

  mainLoop = time => {
    requestAnimationFrame(this.mainLoop);
    if (this.props.heroState === 1 && this.roadRef.current) {
      const top = this.roadRef.current.getBoundingClientRect().top;
      const speed = INITIAL_SPEED + this.props.extraSpeed;
      this.roadRef.current.style.top = top + speed + "px";
      if (top >= 0) {
        this.updateCols();
        this.roadRef.current.style.top = "-128px";
      }
    }
  };

  updateCols = () => {
    let { roadCol1, roadCol5 } = this.state;
    roadCol1.unshift(
      <div key={roadCol1.pop().key} className={getRandomClassName()} />
    );
    roadCol5.unshift(
      <div key={roadCol5.pop().key} className={getRandomClassName()} />
    );
    this.setState({ roadCol1, roadCol5 });
  };

  render() {
    const { roadCol5, roadCol1, roadCol2, roadCol4 } = this.state;
    return (
      <div className="road" ref={this.roadRef}>
        <div className="road-col road-col-1">{roadCol1}</div>
        <div className="road-col road-col-2">{roadCol2}</div>
        <div className="road-col road-col-3" />
        <div className="road-col road-col-4">{roadCol4}</div>
        <div className="road-col road-col-5">{roadCol5}</div>
      </div>
    );
  }
}
const getRandomClassName = () => {
  const r = Math.random();
  if (r < 0.3) {
    return "road-block road-block-tree1";
  } else if (r < 0.6) {
    return "road-block road-block-tree2";
  } else if (r < 0.7) {
    return "road-block road-block-tent";
  } else {
    return "road-block";
  }
};
