import { useContext } from 'react'
import { FarmDataContext } from '../contexts/FarmDataContext'
import Part from './part'

const FarmBlocks: React.FC = () => {
  const farmData = useContext(FarmDataContext)

  return farmData.map((part, index) => {
    if (index === farmData.length - 1) {
      return <Part key={part.id} id={part.id} />
    }

    return (
      <div key={part.id} className="flex flex-col gap-5">
        <Part key={part.id} id={part.id} />
      </div>
    )
  })
}

export default FarmBlocks
