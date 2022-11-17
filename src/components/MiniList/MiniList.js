import React from "react";
import { useContext } from "react";

import printContext from "../../printContext.js";
import { getCreatureImageByName } from "../../dataGetter.js";

import MiniListEntry from "./MiniListEntry";

import "./MiniList.css";

const MiniList = (props) => {
  const [printList, setPrintList] = useContext(printContext);
  return (
    <div className="mini-list">
      <p>Mini List</p>

      {printList.creatures.map((creature) => (
        <MiniListEntry key={creature.id} creature={creature} />
      ))}
    </div>
  );
};

export default MiniList;
