import React, { useState, useEffect } from "react";

import SearchParams from "../SearchParams/SearchParams";

const Browser = (props) => {
  // throw new Error("check the console for errors");

  let [creatureListAll, setCreatureListAll] = useState({});

  useEffect(() => {}, []);

  return (
    <div>
      {/* 
      {(
        () => {
        throw new Error("I have just thrown this error");
      }
      )()} */}

      <SearchParams />
      {/* List of <Creatures> */}

      <p>here's the browser</p>
    </div>
  );
};

export default Browser;
