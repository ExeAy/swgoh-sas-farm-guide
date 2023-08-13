"use client";

import farmGuideData from "../data/ros/farm-guide-data.json";
import characters from "../data/swgoh/characters.json";
import abilities from "../data/swgoh/abilities.json";
import { FarmDataContext } from "../contexts/FarmDataContext";
import { CharacterContext } from "../contexts/CharactersContext";
import { AbilitiesContext } from "../contexts/AbilitiesContext";
import FarmBlocks from "./farm-blocks";

const FarmGuideOverview: React.FC = () => {
  return (
    <FarmDataContext.Provider value={farmGuideData}>
      <CharacterContext.Provider value={characters}>
        <AbilitiesContext.Provider value={abilities}>
          <div>
            <p className="text-xl">
              Denna guide ska ses som en rekommendation för att klara
              guild-events på bästa sätt.
            </p>
            <p className="text-xl">
              Vi har inte tagit hänsyn till skepp men här är vår rekommendation:
            </p>
            <ul className="list-disc list-inside text-xl">
              <li>
                Gå för Executor tidigt. Helt okej att låsa upp den före er
                första GL.
              </li>
              <li>
                Farma upp Malevolance till 7* före ni farmar upp Negotioator.
              </li>
            </ul>
          </div>
          <FarmBlocks />
        </AbilitiesContext.Provider>
      </CharacterContext.Provider>
    </FarmDataContext.Provider>
  );
};

export default FarmGuideOverview;
