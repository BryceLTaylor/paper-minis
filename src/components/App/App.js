import react from "react";
import Header from "../Header/Header.js";
import ErrorBoundary from "../Browser/errorBoundary.js";
import Browser from "../Browser/Browser.js";

import "./App.css";

const App = (props) => (
  <div className="app">
    <Header></Header>
        <ErrorBoundary>
          <Browser></Browser>
        </ErrorBoundary>
  </div>
);

export default App;
