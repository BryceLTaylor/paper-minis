import { useContext } from "react";
import "./Tabs.css";
import PrintContext from "../../printContext";

const Tabs = (props) => {
  const [printList] = useContext(PrintContext);

  async function showPrintList() {
    console.log(printList);
  }

  async function selectTab(tabName) {
    props.switchTabs(tabName);
  }

  return (
    <div className="tabs">
      <div
        className={
          "tab browse-tab" +
          " " +
          (props.currentTab === "browse" ? "selected" : "not-selected")
        } // props.currentTab set selected based on tab state
        onClick={() => selectTab("browse")}
      >
        Browse
      </div>
      <div
        className={
          "tab print-tab" +
          " " +
          (props.currentTab === "print" ? "selected" : "not-selected")
        }
        onClick={() => {
          showPrintList();
          selectTab("print");
        }}
      >
        Print
      </div>
    </div>
  );
};

export default Tabs;
