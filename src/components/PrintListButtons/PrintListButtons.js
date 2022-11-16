import React from "react";

const PrintListButtons = (props) => {
  async function addCreature() {
    console.log(`add ${props.creatureInfo.name} to printlist`);
  }

  return (
    <div className="print-list-buttons">
      <button onClick={addCreature}>Add</button>
    </div>
  );
};

export default PrintListButtons;
