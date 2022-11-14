import react from "react";
import { useContext } from "react";
import "./Tabs.css";
import PrintContext from "../../printContext";

const Tabs = (props) => {
  const [printList] = useContext(PrintContext);
  async function showPrintList() {
    console.log(printList);
  }

  return (
    <div className="tabs">
      <div className="tab browse-tab selected">Browse</div>
      <div
        className="tab print-tab not-selected"
        onClick={(e) => showPrintList()}
      >
        Print
      </div>
    </div>
  );
};

export default Tabs;
