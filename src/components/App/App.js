import react from "react";
import { useState } from "react";

import PrintContext from "../../printContext.js";
import Header from "../Header/Header.js";
import Tabs from "../Tabs/Tabs.js";
import ErrorBoundary from "../Browser/errorBoundary.js";
import Browser from "../Browser/Browser.js";
import MiniPrinter from "../MiniPrinter/MiniPrinter.js";

import "./App.css";

const App = (props) => {
  const printList = useState({ creatures: [] });
  const [tabSelected, setTabSelected] = useState("browse");

  async function changeTabs(tabToChoose) {
    await setTabSelected(tabToChoose);
  }

  return (
    <div className="app">
      <PrintContext.Provider value={printList}>
        <Header></Header>
        <Tabs currentTab={tabSelected} switchTabs={changeTabs}></Tabs>
        {tabSelected === "browse" ? (
          <ErrorBoundary>
            <Browser></Browser>
          </ErrorBoundary>
        ) : null}
        {tabSelected === "print" ? <MiniPrinter /> : null}
      </PrintContext.Provider>
    </div>
  );
};

export default App;
