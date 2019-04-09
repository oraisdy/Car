import React from "react";
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
    this.top = 0;
    this.lastTime = 0;
    this.roadRef = React.createRef();
  }
  componentDidMount() {
    requestAnimationFrame(this.mainLoop);
  }

  // mainLoop = time => {
  //   requestAnimationFrame(this.mainLoop);
  //   if (time - this.lastTime < 1000 / 60) {
  //     return;
  //   }
  //   if (this.props.heroState === 1 && this.roadRef.current) {
  //     const speed = this.props.heroSpeed + this.props.extraSpeed;
  //     this.top = this.top + speed;
  //     this.roadRef.current.style.top = this.top + "px";
  //     if (this.top >= 0) {
  //       this.updateCols();
  //       this.props.increaseKilometer();
  //       this.roadRef.current.style.top = "-128px";
  //       this.top = -128;
  //     }
  //   }
  //   this.lastTime = time;
  // };

  mainLoop = time => {
    requestAnimationFrame(this.mainLoop);
    if (time - this.lastTime < 1000 / 60) {
      return;
    }
    if (this.props.heroState === 1 && this.roadRef.current) {
      const speed = this.props.heroSpeed + this.props.extraSpeed;
      this.top = this.top + speed;
      this.roadRef.current.style.transform =
        "translateY(" + this.top + "px) translateZ(0)";
      if (this.top >= 0) {
        this.updateCols();
        this.props.increaseKilometer();
        this.roadRef.current.style.transform =
          "translateY(-128px) translateZ(0)";
        this.top = -128;
      }
    }
    this.lastTime = time;
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
