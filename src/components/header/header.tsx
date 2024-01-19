import type React from "react"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <div>
      <h1 className="flex justify-center font-bold text-5xl">{title}</h1>
    </div>
  )
}

export default Header
