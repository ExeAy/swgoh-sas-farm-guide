import Header from './header/header'
import farmGuideData from '../assets/data/ros/farm-guide-data.json'
import characters from '../assets/data/swgoh/characters.json'
import abilities from '../assets/data/swgoh/abilities.json'
import { FarmDataContext } from '../contexts/FarmDataContext'
import { CharacterContext } from '../contexts/CharactersContext'
import { AbilitiesContext } from '../contexts/AbilitiesContext'
import FarmBlocks from './farm-blocks'

const Landing: React.FC = () => {
  return (
    <FarmDataContext.Provider value={farmGuideData}>
      <CharacterContext.Provider value={characters}>
        <AbilitiesContext.Provider value={abilities}>
          <div className="flex justify-center w-fit mx-auto pb-10">
            <div className="px-2 flex flex-col items-center w-full gap-5 mt-20">
              <Header />
              <FarmBlocks />
            </div>
          </div>
        </AbilitiesContext.Provider>
      </CharacterContext.Provider>
    </FarmDataContext.Provider>
  )
}

export default Landing
