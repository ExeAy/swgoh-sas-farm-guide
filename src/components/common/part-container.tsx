import type React from 'react'
import type { FarmGuideDataPart } from '../../model/farm-guide'

interface PartContainerProps {
  color: string
  part?: FarmGuideDataPart
  children: React.ReactNode
}

const PartContainer = ({ color, children, part }: PartContainerProps) => {
  return (
    <div
      className={`flex border border-solid w-full rounded-md border-black bg-${color}-200 `}
    >
      <div className="flex flex-col justify-center border-r-2 p-4 border-black w-[10rem]">
        <h3 className="text-2xl whitespace-break-spaces">
          {part?.description}
        </h3>
      </div>
      <div className="p-4 overflow-scroll">{children}</div>
    </div>
  )
}

export default PartContainer
