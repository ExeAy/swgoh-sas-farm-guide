import type React from 'react'

interface PartContainerProps {
  color: string
  partId: string
  children: React.ReactNode
}

const PartContainer = ({ color, children }: PartContainerProps) => {
  return (
    <div
      className={`container flex border border-solid w-full rounded-md border-black bg-${color}`}
    >
      <div className="flex flex-col border-r-2 p-4 border-black">
        <h3>Description goes here</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default PartContainer
