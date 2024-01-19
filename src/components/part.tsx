import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import PartContainer from "./common/part-container"
import { FarmGuideData } from "../contexts/FarmDataContext"
import TeamGroup from "./team-group"
import SubPart from "./sub-part"
import type {
  FarmGuideDataPart,
  FarmGuideDataSubPart,
  FarmGuideTeam,
} from "../model/farm-guide"
import NoteBlock from "./common/notes"

interface PartProps {
  id: string
}

const Part = (props: PartProps) => {
  const { id } = props
  const partData = FarmGuideData.find((part) => part.id === id)

  const element = (
    <div className="flex items-center gap-2">
      {partData?.teamParts!.map((teamPart, index) => {
        if (Object.keys(teamPart).includes("subParts")) {
          const farmGuideSubParts = teamPart as FarmGuideDataSubPart
          if (farmGuideSubParts.subParts.length > 1) {
            return (
              <>
                <div
                  key={partData.id}
                  className={`grid grid-rows-2 gap-2 grid-flow-col`}
                >
                  {farmGuideSubParts.subParts.map((subPart) => {
                    const specialClass = subPart.id.includes("BIG")
                      ? "row-span-2"
                      : ""
                    return (
                      <div
                        key={subPart.id}
                        className={`p-2 bg-${subPart.color}-200 ${specialClass}`}
                      >
                        <SubPart part={subPart} />
                      </div>
                    )
                  })}
                </div>
                {farmGuideSubParts.withArrowAfter && (
                  <ArrowForwardIcon
                    key={`arrow-${farmGuideSubParts.id}`}
                    sx={{ fontSize: 50 }}
                  />
                )}
              </>
            )
          } else {
            const subPart = farmGuideSubParts.subParts[0] as FarmGuideDataPart
            return (
              <>
                <div key={subPart.id} className={`p-2 bg-${subPart.color}-200`}>
                  <SubPart part={subPart} />
                </div>
                {farmGuideSubParts.withArrowAfter && (
                  <ArrowForwardIcon
                    key={`arrow-${farmGuideSubParts.id}`}
                    sx={{ fontSize: 50 }}
                  />
                )}
              </>
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

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {partData?.name}
      </h1>
      <PartContainer color={partData?.color || "white"} part={partData}>
        {element}
      </PartContainer>
      {partData?.notes && <NoteBlock notes={partData.notes} />}
    </div>
  )
}

export default Part
