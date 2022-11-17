import React from "react";
import { useContext } from "react";

import printContext from "../../printContext.js";

import "./MiniList.css";

const MiniList = (props) => {
  const [printList, setPrintList] = useContext(printContext);
  return (
    <div className="mini-list">
      <p>Mini List</p>
      {printList.creatures.map((creature) => (
        <div key={creature.id}>
          <img src={creature.creatureInfo.images[0]} />
          <p>{creature.creatureInfo.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MiniList;
