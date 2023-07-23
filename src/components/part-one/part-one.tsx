import PartContainer from '../common/part-container'
import Squad from '../common/squad'
import { useContext, useMemo } from 'react'
import { FarmDataContext } from '../../contexts/FarmDataContext'

const PartOne = () => {
  const farmGuide = useContext(FarmDataContext)
  const partOneData = useMemo(
    () => farmGuide.find((part) => part.id === 'part1'),
    [farmGuide],
  )

  return (
    <div>
      <h1 className="text-xl font-bold text-center text-gray-800">Prio 1</h1>
      <PartContainer color="red" partId="part-one">
        {partOneData?.teams.map((team) => (
          <Squad key={team.id} team={team} color="red" />
        ))}
      </PartContainer>
    </div>
  )
}

export default PartOne
