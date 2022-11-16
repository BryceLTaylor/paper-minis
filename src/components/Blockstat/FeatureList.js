import React from "react";

import "./Blockstat.css";

const FeatureList = (props) => {
  return props.list.length > 0
    ? props.list.map((feature, index) => (
        <div className="feature" key={feature.name}>
          <span className="feature-name">{feature.name + " "}</span>
          <span className="feature-text">{feature.description}</span>
        </div>
      ))
    : null;
};

export default FeatureList;
