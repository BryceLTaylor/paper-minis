import React from "react";

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

  return (
    <div className="search-params">
      <form className="filters">
        <label for="creatureName">Creature Name</label>
        <input id="creatureName"></input>
        <br />
        <label for="cr">Challenge Rating</label>
        <input id="cr"></input>
        <label for="crOptions">CR match?</label>
        <select id="crOptions">
          <option>equals</option>
          <option>less than</option>
          <option>greater than</option>
          <option>approximately</option>
        </select>
        <br />
        <label for="creatureType">Creature Type</label>
        <select id="creatureType">
          {creatureTypes.map((creatureType) => (
            <option>{creatureType}</option>
          ))}
        </select>
        <button>Submit</button>
      </form>

      <div className="sort-by">
        <label for="SortFirst">Sort First By:</label>
        <select id="sortFirst">
          <option>Name</option>
          <option>Challenge</option>
          <option>Type</option>
        </select>
        <br />
        <label for="SortSecond">Sort Second By:</label>
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
