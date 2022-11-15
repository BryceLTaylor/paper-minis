import React from "react";
import { useState, useEffect } from "react";

const Creature = (props) => {
  const [creatureInfo, setCreatureInfo] = useState({});

  useEffect(() => {
    getCreatureInfo();
  }, []);

  async function getCreatureInfo() {
    console.log("looking for creature info");
    // await fetch(`/data/${props.id}.json`);
    // await setCreatureInfo(res.json());
  }

  return (
    <div className="creature">
      <p className="creatureName"> {props.name}</p>
    </div>
  );
};

export default Creature;
