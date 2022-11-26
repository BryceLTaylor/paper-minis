import { useState } from "react";
import "./MiniAssembly.css";

import LayoutCanvas from "./LayoutCanvas";

const MiniAssembly = (props) => {
  return (
    <div className="mini-assembly">
      <LayoutCanvas />
    </div>
  );
};

export default MiniAssembly;
