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
          <div className="flex justify-center">
            <div className="px-2 w-fit flex flex-col gap-5 mt-20">
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
