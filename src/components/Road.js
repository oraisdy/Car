import React from "react";
export default class Road extends React.Component {
  render() {
    const { heroState } = this.props;
    return (
      <div className={`road ${heroState === 1 ? "running" : "paused"}`}>
        <div
          className={`road-col road-col-1 ${
            heroState === 1 ? "running" : "paused"
          }`}
        />
        <div
          className={`road-col road-col-2 ${
            heroState === 1 ? "running" : "paused"
          }`}
        />
        <div
          className={`road-col road-col-3 ${
            heroState === 1 ? "running" : "paused"
          }`}
        />
        <div
          className={`road-col road-col-4 ${
            heroState === 1 ? "running" : "paused"
          }`}
        />
        <div
          className={`road-col road-col-5 ${
            heroState === 1 ? "running" : "paused"
          }`}
        />
      </div>
    );
  }
}
