import React from "react";

import "./Blockstat.css";

const NormalInfo = (props) => {
  return (
    <div className="{props.classToUse} normal-info">
      <span className="info-name">{props.infoName + " "}</span>
      <span className="info-value">{props.infoValue}</span>
    </div>
  );
};

export default NormalInfo;
