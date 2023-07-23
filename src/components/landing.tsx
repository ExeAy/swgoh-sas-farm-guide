import type React from 'react'
import Header from './header/header'

const Landing: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="container mt-20">
        <Header />
      </div>
    </div>
  )
}

export default Landing
