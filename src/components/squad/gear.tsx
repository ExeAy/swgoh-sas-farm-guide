import type { FarmGuideTeamMember } from '../../model/farm-guide'

interface RequiredGearProps {
  teamMember: FarmGuideTeamMember
}

const RequiredGear: React.FC<RequiredGearProps> = (props) => {
  const { teamMember } = props

  return (
    <div className="leading-none text-sm text-gray-800 mb-1">
      <span>Minimum gear: </span>
      {teamMember.relic ? (
        <span>Relic: {teamMember.relic}</span>
      ) : (
        <span>Gear: {teamMember.gear}</span>
      )}
    </div>
  )
}

export default RequiredGear
