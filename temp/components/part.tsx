import PartContainer from './common/part-container'
import { useContext, useMemo } from 'react'
import { FarmDataContext } from '../contexts/FarmDataContext'
import TeamGroup from './team-group'
import SubPart from './sub-part'
import type { FarmGuideDataPart, FarmGuideTeam } from '../model/farm-guide'

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

  const element = useMemo<JSX.Element>(() => {
    return (
      <div className="flex items-center gap-2">
        {partData?.teamParts!.map((teamPart, index) => {
          if (Array.isArray(teamPart)) {
            if (teamPart.length > 1) {
              return (
                <div className={`grid grid-rows-2 gap-2 grid-flow-col`}>
                  {(teamPart as FarmGuideDataPart[]).map((subPart) => (
                    <div className={`p-2 bg-${subPart.color}-200`}>
                      <SubPart key={subPart.id} part={subPart} />
                    </div>
                  ))}
                </div>
              )
            } else {
              const subPart = teamPart[0] as FarmGuideDataPart
              return (
                <div className={`p-2 bg-${subPart.color}-200`}>
                  <SubPart key={subPart.id} part={subPart} />
                </div>
              )
            }
          } else {
            return (
              <TeamGroup
                key={teamPart.id}
                team={teamPart as FarmGuideTeam}
                allTeams={partData.teamParts}
                color={partData.color}
                index={index}
              />
            )
          }
        })}
      </div>
    )
  }, [partData])

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {partData?.name}
      </h1>
      <PartContainer color={partData?.color || 'white'} part={partData}>
        {element}
      </PartContainer>
      {partData?.notes && <p className="text-sm">{partData.notes}</p>}
    </div>
  )
}

export default Part
