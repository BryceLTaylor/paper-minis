import React from "react";
import { useState, useEffect } from "react";

import "./Blockstat.css";

const Blockstat = (props) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(props.creatureInfo);
    console.log(info);
  }, [props.creatureInfo]);

  return info.id ? (
    <div className="blockstat">
      <h2>{info.name}</h2>
      <p className="first-line-info">
        {info.size +
          " " +
          info.types.map((type) => type + " ") +
          info.alignment}
      </p>
      <hr />
      <div className="ac normal-info">
        <span className="info-name">Armor Class </span>
        <span className="info-value">{info.ac}</span>
      </div>
      <div className="hp normal-info">
        <span className="info-name">Hit Points </span>
        <span className="info-value">{info.hp}</span>
      </div>
      <div className="speed normal-info">
        <span className="info-name">Speed </span>

        {Object.entries(info.speed).map(([key, value]) =>
          key === "walking" ? (
            <span className="info-value" key={key}>
              {value + " " + "ft."}{" "}
            </span>
          ) : (
            <span className="info-value" key={key}>
              {",       " + key + " " + value + " ft."}
            </span>
          )
        )}
      </div>
      <hr />
      <div className="stats">
        {Object.entries(info.stats).map(([key, value]) => (
          <span key={key}>
            <div className="info-name">{key.toUpperCase()}</div>
            <div className="info-value">
              {value + " (" + Math.floor((value - 10) / 2) + ")"}
            </div>
          </span>
        ))}
      </div>
      <hr />

      {info.skills.length > 0 ? (
        <div className="skills normal-info">
          <span className="info-name">Skills </span>
          <span className="info-value">
            {info.skills.map((skill) => skill + " ")}
          </span>
        </div>
      ) : (
        <div />
      )}

      {info["damage vulnerabilities"].length > 0 ? (
        <div className="dv normal-info">
          <span className="info-name">Damage Vulnerabilities </span>
          <span className="info-value">
            {info["damage vulnerabilities"].map((dr) => dr + " ")}
          </span>
        </div>
      ) : (
        <div />
      )}

      {info["damage resistances"].length > 0 ? (
        <div className="dr normal-info">
          <span className="info-name">Damage Resistances </span>
          <span className="info-value">
            {info["damage resistances"].map((dr) => dr + " ")}
          </span>
        </div>
      ) : (
        <div />
      )}

      {info["damage immunities"].length > 0 ? (
        <div className="di normal-info">
          <span className="info-name">Damage Immunities </span>
          <span className="info-value">
            {info["damage immunities"].map((dr) => dr + " ")}
          </span>
        </div>
      ) : (
        <div />
      )}

      {info["condition immunities"].length > 0 ? (
        <div className="ci normal-info">
          <span className="info-name">Condition Immunities </span>
          <span className="info-value">
            {info["condition immunities"].map((dr) => dr + " ")}
          </span>
        </div>
      ) : (
        <div />
      )}

      <div className="senses normal-info">
        <span className="info-name">Senses</span>
        <span className="info-value">
          {info.senses.map((sense) => " " + sense)}
        </span>
        <span className="info-value">
          {" passive Perception "}
          {info["passive-perception"]}
        </span>
      </div>

      <div className="languages normal-info">
        <span className="info-name">Languages</span>
        {info.languages.length > 0 ? (
          <span className="info-value">
            {info.languages.map((language, index) => {
              let returnString = " " + language;
              if (index !== info.languages.length - 1) {
                returnString = returnString + ",";
              }
              return returnString;
            })}
          </span>
        ) : (
          <span className="info-value">{"  --"}</span>
        )}
      </div>

      <div className="cr normal-info">
        <span className="info-name">Challenge </span>
        <span className="info-value">{info.challenge}</span>
      </div>

      <hr />
    </div>
  ) : (
    <p>no blockstat available</p>
  );
};

export default Blockstat;
