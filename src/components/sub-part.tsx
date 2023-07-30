import type { FarmGuideDataPart, FarmGuideTeam } from '../model/farm-guide'
import TeamGroup from './team-group'

interface SubPartProps {
  part: FarmGuideDataPart
}

const SubPart = (props: SubPartProps) => {
  const { part } = props

  return (
    <div className="flex items-center gap-2">
      {(part?.teamParts as FarmGuideTeam[])!.map((team, index) => (
        <TeamGroup
          key={team.id}
          team={team}
          allTeams={part.teamParts}
          color={part.color}
          index={index}
        />
      ))}
    </div>
  )
}

export default SubPart
