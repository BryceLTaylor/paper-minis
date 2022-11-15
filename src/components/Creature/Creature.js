import React from "react";
import { useState, useEffect } from "react";

import { getCreatureJson, getCreatureImageByName } from "../../dataGetter.js";
import missingImage from "../../../images/missing.png";

import "./Creature.css";

const Creature = (props) => {
  const [creatureInfo, setCreatureInfo] = useState({
    name: "",
    images: [],
  });
  const [creatureImage, setCreatureImage] = useState(missingImage);

  useEffect(() => {
    getCreatureInfo();
  }, []);

  useEffect(() => {
    getCreatureImage();
  }, [creatureInfo]);

  async function getCreatureInfo() {
    console.log("looking for creature info");
    let creatureJSON = await getCreatureJson(props.creatureId);
    await setCreatureInfo(creatureJSON);
  }

  async function getCreatureImage() {
    let imageName = creatureInfo.images[0]
      ? creatureInfo.images[0]
      : "missing.png";
    let creatureImage = await getCreatureImageByName(imageName);
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
