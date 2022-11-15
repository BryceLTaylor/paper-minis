import React from "react";
import { useState, useEffect } from "react";

import { getCreatureJson, getCreatureImage } from "../../dataGetter.js";
import missingImage from "../../../images/missing.png";

const Creature = (props) => {
  const [creatureInfo, setCreatureInfo] = useState({
    name: "",
  });
  const [creatureImage, setCreatureImage] = useState(missingImage);

  useEffect(() => {
    getCreatureInfo();
  }, []);

  async function getCreatureInfo() {
    console.log("looking for creature info");
    let creatureJSON = await getCreatureJson(props.creatureId);
    setCreatureInfo(creatureJSON);
    let creatureImage = await getCreatureImage(props.creatureId);
    setCreatureImage(creatureImage);
  }

  return (
    <div className="creature">
      <p className="creatureName"> {creatureInfo.name}</p>
      <img
        src={creatureImage}
        alt={"picture of " + creatureInfo.name}
        width="100"
      ></img>
    </div>
  );
};

export default Creature;
