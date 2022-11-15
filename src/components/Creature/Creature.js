import React from "react";
import { useState, useEffect } from "react";

import { getCreatureJson } from "../../creatureListGenerator.js";

const Creature = (props) => {
  const [creatureInfo, setCreatureInfo] = useState({});

  useEffect(() => {
    getCreatureInfo();
  }, []);

  async function getCreatureInfo() {
    console.log("looking for creature info");
    let creatureJSON = await getCreatureJson(props.creatureId);
    setCreatureInfo(creatureJSON);
  }

  return (
    <div className="creature">
      <p className="creatureName"> {creatureInfo.name}</p>
    </div>
  );
};

export default Creature;
