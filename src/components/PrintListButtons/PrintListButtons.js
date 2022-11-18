import React from "react";
import { useState, useEffect, useContext } from "react";

import printContext from "../../printContext.js";
import "./PrintListButtons.css";
import AddButton from "./AddButton.js";

const PrintListButtons = (props) => {
  // props creatureInfo
  const [printList, setPrintList] = useContext(printContext);
  const [countInList, setCountInList] = useState(0);

  useEffect(() => {
    getListCount();
  }, []);

  /*
    {
        id: #,
        count: #,
        creatureInfo: {} // different from props.creatureInfo
    }
  */
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

  async function getListCount() {
    let creatureInList = await findCreature(printList, props.creatureInfo.id);
    setCountInList(creatureInList?.count ?? 0);
  }

  return (
    <div className="print-list-buttons">
      <AddButton
        creatureInfo={props.creatureInfo}
        updateListCount={getListCount}
        buttonText="Add"
        numberToAdd={1}
      />
      <div>{countInList}</div>
      {countInList > 0 ? (
        <AddButton
          creatureInfo={props.creatureInfo}
          updateListCount={getListCount}
          buttonText="Remove"
          numberToAdd={-1}
        />
      ) : null}
    </div>
  );
};

export default PrintListButtons;
