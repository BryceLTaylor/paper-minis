import React from "react";
import { useState, useEffect } from "react";

import { getCreatureJson, getCreatureImageByName } from "../../dataGetter.js";
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
    await setCreatureInfo(creatureJSON);
    let creatureImage = await getCreatureImageByName(creatureInfo.images[0]);
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
