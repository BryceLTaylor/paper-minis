import { useContext } from "react";

import printContext from "../../printContext.js";

import "./PrintListButtons.css";

const AddButton = (props) => {
  // props: creatureInfo,  updateListCount buttonText
  const [printList, setPrintList] = useContext(printContext);

  async function addCreature() {
    let creatureObject = await findCreature(printList, props.creatureInfo.id);
    if (creatureObject === null) {
      addNewCreature();
    } else {
      changeCreatureCount(1);
    }
    props.updateListCount();
  }

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

    setPrintList(printListCopy); //replace listcontext with copy
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
    }

    setPrintList(printListCopy);
  }

  async function removeCreature() {
    changeCreatureCount(-1);
    props.updateListCount();
  }

  return (
    <button
      className="add-button"
      onClick={props.numberToAdd === 1 ? addCreature : removeCreature}
    >
      {props.buttonText}
    </button>
  );
};

export default AddButton;
