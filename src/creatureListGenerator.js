import allCreatures from "../data/creature-index.json";

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

export default getCreatureList;
