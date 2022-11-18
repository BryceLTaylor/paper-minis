import { useState, useEffect, useContext } from "react";

import missingImage from "../../../images/missing.png";
import { getCreatureImageByName } from "../../dataGetter.js";
import AddButton from "../PrintListButtons/AddButton.js";

import printContext from "../../printContext.js";

const MiniListEntry = (props) => {
  // props: key creature count
  const [printList, setPrintList] = useContext(printContext);

  const [creatureImage, setCreatureImage] = useState(missingImage);
  const [creatureCount, setCreatureCount] = useState(0);

  useEffect(() => {
    getCreatureImage(printList, props.creature.id);
  }, []);

  useEffect(() => {
    updatePrintCounts();
  }, []);

  async function findCreature(creatureList, creatureId) {
    let creatureInList = null;

    // check all objects in the list
    creatureList.creatures.forEach((creatureObject) => {
      if (creatureObject.id === creatureId) {
        creatureInList = creatureObject;
      }
    });
    return creatureInList;
  }

  async function getCreatureImage() {
    let image = await getCreatureImageByName(
      props.creature.creatureInfo.images[0]
    );
    await setCreatureImage(image);
  }

  async function updatePrintCounts() {
    let creatureInPrintList = await findCreature(printList, props.creature.id);
    let newCount = await creatureInPrintList.count;
    setCreatureCount(newCount);
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
            buttonText="Add"
            numberToAdd={1}
          />
          <AddButton
            creatureInfo={props.creature}
            updateListCount={updatePrintCounts}
            buttonText="Remove"
            numberToAdd={-1}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniListEntry;
