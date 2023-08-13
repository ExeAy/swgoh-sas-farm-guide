import { Analytics } from "@vercel/analytics/react";
import FarmGuideOverview from "../src/components/farm-guide-overview";
import Header from "../src/components/header/header";
import PlayerRecommendations from "../src/components/player-recommendations/player-recommendations";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center w-fit mx-auto pb-10">
        <div className="px-2 flex flex-col items-center w-full gap-5 mt-20">
          <Header />
          <PlayerRecommendations />
          <hr className="border-t border-gray w-full" />
          <FarmGuideOverview />
        </div>
      </div>
      <Analytics />
    </main>
  );
}
