import React from "react";
import { useState, useEffect } from "react";

import missingImage from "../../../images/missing.png";
import { getCreatureImageByName } from "../../dataGetter.js";
import AddButton from "../PrintListButtons/AddButton.js";

const MiniListEntry = (props) => {
  const [creatureImage, setCreatureImage] = useState(missingImage);
  const [creatureCount, setCreatureCount] = useState(props.creature.count);

  useEffect(() => {
    getCreatureImage();
  }, []);

  //   useEffect(() => {

  //   },[creatureCount])

  async function getCreatureImage() {
    let image = await getCreatureImageByName(
      props.creature.creatureInfo.images[0]
    );
    await setCreatureImage(image);
  }

  async function updatePrintCounts(newCount) {
    console.log("update print counts");
    setCreatureCount(props.creature.count);
  }

  return (
    <div className="print-list-entry">
      <img src={creatureImage} width="50px" height="50px" />
      <div className="data">
        <div className="creature-name">{props.creature.creatureInfo.name}</div>
        <div className="data-and-buttons">
          <div className="count">{"Count: " + creatureCount}</div>
          <AddButton
            creatureInfo={props.creature}
            updateListCount={updatePrintCounts}
          />
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default MiniListEntry;
