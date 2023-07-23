import Header from './header/header'
import PartOne from './part'
import farmGuideData from '../assets/data/ros/farm-guide-data.json'
import { FarmDataContext } from '../contexts/FarmDataContext'
import { getAbilities, getCharacters } from '../api/swgoh.gg'
import { CharacterContext } from '../contexts/CharactersContext'
import { AbilitiesContext } from '../contexts/AbilitiesContext'
import FarmBlocks from './farm-blocks'

const characters = await getCharacters()
const abilities = await getAbilities()

const Landing: React.FC = () => {
  return (
    <FarmDataContext.Provider value={farmGuideData}>
      <CharacterContext.Provider value={characters}>
        <AbilitiesContext.Provider value={abilities}>
          <div className="flex justify-center">
            <div className="container flex flex-col gap-5 mt-20">
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
