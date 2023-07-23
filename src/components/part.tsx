import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PartContainer from './common/part-container'
import Squad from './common/squad'
import { useContext, useMemo } from 'react'
import { FarmDataContext } from '../contexts/FarmDataContext'

interface PartProps {
  id: string
}

const Part = (props: PartProps) => {
  const { id } = props
  const farmGuide = useContext(FarmDataContext)
  const partData = useMemo(
    () => farmGuide.find((part) => part.id === id),
    [farmGuide],
  )

  return (
    <div>
      <h1 className="text-xl font-bold text-center text-gray-800">Prio 1</h1>
      <PartContainer color="red" part={partData}>
        <div className="flex items-center gap-2">
          {partData?.teams.map((team, index) => {
            if (index === partData.teams.length - 1)
              return <Squad key={team.id} team={team} color="red" />

            return (
              <>
                <Squad key={team.id} team={team} color="red" />
                <ArrowForwardIcon sx={{ fontSize: 50 }} />
              </>
            )
          })}
        </div>
      </PartContainer>
    </div>
  )
}

export default Part
