import React, { useState, useEffect } from "react";

import SearchParams from "../SearchParams/SearchParams";
import Creature from "../Creature/Creature.js";

import { getCreatureList } from "../../creatureListGenerator.js";

import "./Browser.css";

const Browser = (props) => {
  // throw new Error("check the console for errors");

  let [creatureListAll, setCreatureListAll] = useState([]);
  let [searchOptions, setSearchOptions] = useState({
    name: "",
    CR: "",
    CRMatch: "equals",
    creatureType: "",
    firstSort: "name",
    secondSort: "",
  });

  async function requestCreatures() {
    let newCreatureList = await getCreatureList(searchOptions);
    await setCreatureListAll(newCreatureList);
    await console.log(creatureListAll);
  }

  useEffect(() => {
    requestCreatures();
  }, []);

  return (
    <div className="browser">
      <SearchParams />
      {/* List of <Creatures> */}
      {creatureListAll.map((creatureJSON) => (
        <Creature
          key={creatureJSON.id}
          name={creatureJSON.name}
          creatureId={creatureJSON.id}
        />
      ))}
    </div>
  );
};

export default Browser;
