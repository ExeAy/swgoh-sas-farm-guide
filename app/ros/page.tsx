import FarmGuideOverview from "../../src/components/farm-guide-overview"
import Header from "../../src/components/header/header"
import PlayerRecommendations from "../../src/components/player-recommendations/player-recommendations"

const RoS: React.FC = () => {
  return (
    <>
      <Header title="RoS Farm Guide" />
      <PlayerRecommendations />
      <hr className="border-t border-gray w-full" />
      <FarmGuideOverview />
    </>
  )
}

export default RoS
