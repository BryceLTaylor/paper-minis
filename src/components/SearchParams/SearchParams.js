import React from "react";
import { useState, useEffect } from "react";

import "./SearchParams.css";

const SearchParams = (props) => {
  const creatureTypes = [
    "any",
    "humanoid",
    "kobold",
    "beast",
    "aberration",
    "dragon",
    "monstrosity",
  ];
  const crOptions = ["equals", "less than", "greater than", "approximately"];

  const [nameSearch, setNameSearch] = useState("");
  const [crSearch, setCrSearch] = useState("");
  const [crMatch, setCrMatch] = useState("equals");
  const [creatureTypeSearch, setCreatureTypeSearch] = useState("any");

  async function getCreatures() {
    console.log("getting creatures");
  }

  return (
    <div className="search-params">
      <form className="filters" onSubmit={() => getCreatures()}>
        <label htmlFor="creatureName">
          Creature Name
          <input
            id="creatureName"
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          ></input>
        </label>
        <br />
        <label htmlFor="cr">
          Challenge Rating
          <input
            id="cr"
            onChange={(e) => {
              setCrSearch(e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="crOptions">
          CR match?
          <select
            id="crOptions"
            onChange={(e) => {
              setCrMatch(e.target.value);
            }}
          >
            {crOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="creatureType">
          Creature Type
          <select
            id="creatureType"
            onChange={(e) => {
              setCreatureTypeSearch(e.target.value);
            }}
          >
            <option />
            {creatureTypes.map((creatureType) => (
              <option key={creatureType}>{creatureType}</option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={() => getCreatures()}>Submit</button>
      </form>

      <div className="sort-by">
        <label htmlFor="SortFirst">Sort First By:</label>
        <select id="sortFirst">
          <option>Name</option>
          <option>Challenge</option>
          <option>Type</option>
        </select>
        <br />
        <label htmlFor="SortSecond">Sort Second By:</label>
        <select id="sortSecond">
          <option>Name</option>
          <option>Challenge</option>
          <option>Type</option>
        </select>
      </div>
    </div>
  );
};

export default SearchParams;
