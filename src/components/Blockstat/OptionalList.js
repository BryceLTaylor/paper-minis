import React from "react";

import "./Blockstat.css";

const OptionalList = (props) => {
  return props.list.length > 0 ? (
    <div className="skills normal-info">
      <span className="info-name">{props.infoName}</span>
      <span className="info-value">
        {props.list.map((listItem, index) => {
          let returnString = " " + listItem;
          if (index !== props.list.length - 1) {
            returnString = returnString + ",";
          }
          return returnString;
        })}
      </span>
    </div>
  ) : (
    <div />
  );
};

export default OptionalList;
