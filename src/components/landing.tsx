import Header from './header/header'
import PartOne from './part-one/part-one'
import farmGuideData from '../assets/data/ros/farm-guide-data.json'
import { FarmDataContext } from '../contexts/FarmDataContext'
import { getCharacters } from '../api/swgoh.gg'
import { CharacterContext } from '../contexts/CharactersContext'

const characters = await getCharacters()

const Landing: React.FC = () => {
  return (
    <FarmDataContext.Provider value={farmGuideData}>
      <CharacterContext.Provider value={characters}>
        <div className="flex justify-center">
          <div className="container flex flex-col gap-5 mt-20">
            <Header />
            <PartOne />
          </div>
        </div>
      </CharacterContext.Provider>
    </FarmDataContext.Provider>
  )
}

export default Landing
