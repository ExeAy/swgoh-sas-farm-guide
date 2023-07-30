import type { FarmGuideDataPart, FarmGuideTeam } from '../model/farm-guide'
import TeamGroup from './team-group'

interface SubPartProps {
  part: FarmGuideDataPart
}

const SubPart = (props: SubPartProps) => {
  const { part } = props

  return (
    <div
      className={`p-2 rounded bg-${part.color}-300 flex flex-col items-center`}
    >
      <h3 className="text-2xl font-bold mb-2">{part.name}</h3>
      <div className={`flex items-center gap-2`}>
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
    </div>
  )
}

export default SubPart
