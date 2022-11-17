import allCreatures from "../data/creature-index.json";
import creatureInfo from "../data/creatures/creature-info.json";

import missingImage from "../images/missing.png";
import wolf1 from "../images/wolf1.jpg";
import youngRedDragon1 from "../images/youngRedDragon1.jpg";
import beholder1 from "../images/beholder1.png";
import kobold1 from "../images/kobold1.png";
import minotaur1 from "../images/minotaur1.png";
import umberHulk1 from "../images/umberHulk1.png";

async function getCreatureList() {
  let creatureList = allCreatures.creatures;

  /*
    name: "",
    CR: "",
    CRMatch: "equals",
    creatureType: "",
    firstSort: "name",
    secondSort: "",
    */

  return creatureList;
}

async function getCreatureJson(creatureId) {
  let creatureObject = {};
  let creatureList = creatureInfo.creatures;
  for (let i = 0; i < creatureList.length; i++) {
    if (creatureList[i].id === creatureId) {
      creatureObject = creatureList[i];
    }
  }
  return creatureObject;
}

async function getCreatureImageById(creatureId) {
  let image;
  switch (creatureId) {
    case 1:
      image = kobold1;
      break;
    case 2:
      image = wolf1;
      break;
    case 3:
      image = beholder1;
      break;
    case 4:
      image = youngRedDragon1;

      break;
    case 5:
      image = minotaur1;
      break;
    case 6:
      image = umberHulk1;
      break;
    default:
      image = missingImage;
  }

  return image;
}

async function getCreatureImageByName(fileName) {
  let image;
  switch (fileName) {
    case "kobold1.png":
      image = kobold1;
      break;
    case "wolf1.jpg":
      image = wolf1;
      break;
    case "beholder1.png":
      image = beholder1;
      break;
    case "youngRedDragon1.jpg":
      image = youngRedDragon1;
      break;
    case "minotaur1.png":
      image = minotaur1;
      break;
    case "umberHulk1.png":
      image = umberHulk1;
      break;
    default:
      image = missingImage;
  }

  return image;
}

export {
  getCreatureList,
  getCreatureJson,
  getCreatureImageById,
  getCreatureImageByName,
};
