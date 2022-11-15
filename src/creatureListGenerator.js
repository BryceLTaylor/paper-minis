import allCreatures from "../data/creature-index.json";
import creatureInfo from "../data/creatures/creature-info.json";

async function getCreatureList(searchOptions) {
  let creatureList = allCreatures.creatures;

  console.log(searchOptions);
  console.log(Array.isArray(creatureList));
  console.log(creatureList);

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
  creatureList = creatureInfo.creatures;
  for (let i = 0; i < creatureList.length; i++) {
    if (creatureList[i].id === creatureId) {
      creatureObject = creatureList[i];
    }
  }
  return creatureObject;
}

export { getCreatureList, getCreatureJson };
