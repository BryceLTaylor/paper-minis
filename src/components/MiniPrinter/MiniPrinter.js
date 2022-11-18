import MiniList from "../MiniList/MiniList.js";

import MiniAssembly from "../MiniAssembly/MiniAssembly.js";
import "./MiniPrinter.css";

const MiniPrinter = (props) => {
  return (
    <div className="mini-printer">
      <MiniList />
      <MiniAssembly />
    </div>
  );
};

export default MiniPrinter;
