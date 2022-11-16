import React from "react";
import { useState, useEffect } from "react";

import NormalInfo from "./NormalInfo.js";
import OptionalList from "./OptionalList.js";
import FeatureList from "./FeatureList";

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
      <NormalInfo
        classToUse="ac"
        infoName="Armor Class"
        infoValue={info.ac + " " + info["ac type"]}
      />
      <NormalInfo classToUse="hp" infoName="Hit Points" infoValue={info.hp} />

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
      <OptionalList list={info["saving throws"]} infoName="Saving Throw" />
      <OptionalList list={info.skills} infoName="Skills" />
      <OptionalList
        list={info["damage vulnerabilities"]}
        infoName="Damage Vulnerabilities"
      />
      <OptionalList
        list={info["damage resistances"]}
        infoName="Damage Resistances"
      />
      <OptionalList
        list={info["damage immunities"]}
        infoName="Damage Immunities"
      />
      <OptionalList
        list={info["condition immunities"]}
        infoName="Condition Immunities"
      />

      <div className="senses normal-info">
        <span className="info-name">Senses</span>
        <span className="info-value">
          {info.senses.map((sense) => " " + sense)}
        </span>
        <span className="info-value">
          {" passive Perception "}
          {info["passive perception"]}
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
      <NormalInfo
        classToUse="cr"
        infoName="Challenge"
        infoValue={info.challenge}
      />
      <hr />

      {/* Features */}
      <FeatureList list={info.features} />

      {/* Actions */}
      {info.actions.length > 0 ? (
        <div className="feature-header">
          <div>Actions</div>
          <hr />
        </div>
      ) : null}
      <FeatureList list={info.actions} />
      {/* Legendary Actions */}
      {info["legendary actions"]["legendary actions"].length > 0 ? (
        <div className="feature-header">
          <div>Legendary Actions</div>
          <hr />
          <div className="normal-text">
            {info["legendary actions"].description}
          </div>
        </div>
      ) : null}
      <FeatureList list={info["legendary actions"]["legendary actions"]} />
      {/* Reactions */}
      {info.reactions.length > 0 ? (
        <div className="feature-header">
          <div>Reactions</div>
          <hr />
        </div>
      ) : null}
      <FeatureList list={info.reactions} />
    </div>
  ) : (
    <p>no blockstat available</p>
  );
};

export default Blockstat;
