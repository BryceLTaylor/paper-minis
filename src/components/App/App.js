import react from "react";
import { useState } from "react";

import PrintContext from "../../printContext.js";
import Header from "../Header/Header.js";
import Tabs from "../Tabs/Tabs.js";
import ErrorBoundary from "../Browser/errorBoundary.js";
import Browser from "../Browser/Browser.js";

import "./App.css";

const App = (props) => {
  const printList = useState({ creatures: [] });
  return (
    <div className="app">
      <PrintContext.Provider value={printList}>
        <Header></Header>
        <Tabs></Tabs>
        <ErrorBoundary>
          <Browser></Browser>
        </ErrorBoundary>
      </PrintContext.Provider>
    </div>
  );
};

export default App;
