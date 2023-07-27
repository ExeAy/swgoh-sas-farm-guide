import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { FarmGuideTeam } from '../model/farm-guide'
import Squad from './common/squad'
import { useContext } from 'react'
import { FarmDataContext } from '../contexts/FarmDataContext'

interface TeamGroupProps {
  team: FarmGuideTeam
  allTeams: FarmGuideTeam[]
  color: string
  index: number
}

const TeamGroup = (props: TeamGroupProps) => {
  const { team, index, color, allTeams } = props

  if (!team.members && !team.subTeams && team.notes)
    return (
      <p className="m-3 p-3 bg-white rounded-lg text-lg w-squad">
        {team.notes}
      </p>
    )

  const elements: JSX.Element[] = []

  if (
    index !== 0 &&
    (allTeams[index - 1].subTeams || allTeams[index - 1].members)
  ) {
    elements.push(
      <ArrowForwardIcon key={`arrow-${team.id}`} sx={{ fontSize: 50 }} />,
    )
  }

  if (team.subTeams) {
    elements.push(
      <div
        key={team.id}
        className={`flex flex-col p-4 gap-2 bg-${color}-400 rounded-md w-fit`}
      >
        <h4 className="font-bold text-center text-xl">{team.name}</h4>
        <div className="grid grid-rows-2 gap-2 grid-flow-col">
          {team.subTeams.map((subTeam) => (
            <Squad key={subTeam.id} team={subTeam} />
          ))}
        </div>
        <div>
          <p className="text-sm w-squad-container-text">{team.notes}</p>
        </div>
      </div>,
    )
  } else {
    elements.push(<Squad key={team.id} team={team} />)
  }

  if (team.members)
    return <div className="flex items-center gap-1">{elements}</div>
}

export default TeamGroup
