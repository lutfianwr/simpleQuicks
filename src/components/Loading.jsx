import React from "react";
import "../styles/loading.scss";
import Lottie from "lottie-react";
import spin from "../assets//spin.json";

const Loading = (props) => {
  return (
    <div className="loading">
      <Lottie className="lottie" animationData={spin} loop={true} />
      {props.tag}
    </div>
  );
};

export default Loading;
