"use client"

import AllyCodeForm from "./ally-code-form"
import Container from "@mui/material/Container/Container"
import CharactersSuggestions from "./recommendations/characters"
import { getPlayerData } from "../../actions/player.actions"
import { useState } from "react"
import { Player } from "../../model/player"
import { FarmDataContext } from "../../contexts/FarmDataContext"
import { CharacterContext } from "../../contexts/CharactersContext"
import characters from "../../data/swgoh/characters.json"
import farmGuideData from "../../data/ros/farm-guide-data.json"

const PlayerRecommendations: React.FC = () => {
  const [player, setPlayer] = useState<Player>()

  const getPlayer = async (allyCode: string): Promise<void> => {
    try {
      if (!allyCode) throw new Error("Ange en ally code")
      const player = await getPlayerData(allyCode)
      setPlayer(player)
    } catch (error) {
      throw new Error("Kunde inte hitta spelaren")
    }
  }

  return (
    <FarmDataContext.Provider value={farmGuideData}>
      <CharacterContext.Provider value={characters}>
        <Container className="!flex flex-col justify-center items-center gap-6">
          <AllyCodeForm getPlayer={getPlayer} />
          <div className="flex">
            <CharactersSuggestions player={player} />
          </div>
        </Container>
      </CharacterContext.Provider>
    </FarmDataContext.Provider>
  )
}

export default PlayerRecommendations
