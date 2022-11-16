import React from "react";
import { useState, useContext } from "react";

import printContext from "../../printContext.js";

const PrintListButtons = (props) => {
  const [printList, setPrintList] = useContext(printContext);
  const [countInList, setCountInList] = useState(0);

  async function addCreature() {
    console.log(`add ${props.creatureInfo.name} to printlist`);
    let creatureObject = await findCreature(printList, props.creatureInfo.id);
    console.log(creatureObject);
    if (creatureObject === null) {
      addNewCreature();
    } else {
      changeCreatureCount(1);
    }
    getListCount();
  }

  /*
    {
        id: #,
        count: #,
        creatureInfo: {}
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

  async function addNewCreature() {
    let newCreature = {
      id: props.creatureInfo.id,
      count: 1,
      creatureInfo: props.creatureInfo,
    };
    //add newCreature to copy of the listcontext
    let printListCopy = printList;
    printListCopy.creatures.push(newCreature);
    console.log(printListCopy);
    //replace listcontext with copy
    setPrintList(printListCopy);
  }

  async function changeCreatureCount(number) {
    let printListCopy = printList;
    let creatureToChange = await findCreature(
      printListCopy,
      props.creatureInfo.id
    );
    creatureToChange.count += number;

    //remove creatureToChange from printListCopy
    if (creatureToChange.count <= 0) {
      let index = printListCopy.creatures.indexOf(creatureToChange);
      printListCopy.creatures.splice(index, 1);
      console.log(printListCopy.creatures);
    }

    setPrintList(printListCopy);
  }

  async function getListCount() {
    let creatureInList = await findCreature(printList, props.creatureInfo.id);
    console.log(creatureInList);
    setCountInList(creatureInList.count);
  }

  async function removeCreatureFromList() {
    changeCreatureCount(-1);
    getListCount();
  }

  return (
    <div className="print-list-buttons">
      <button onClick={addCreature}>Add</button>
      <div>{countInList}</div>
      {countInList > 0 ? (
        <button onClick={() => removeCreatureFromList()}>Remove 1</button>
      ) : null}
    </div>
  );
};

export default PrintListButtons;
