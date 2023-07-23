import type { Ability } from '../model/ability'
import type { Character } from '../model/character'

export const getCharacters = async (): Promise<Character[]> => {
  const response = await fetch('http://api.swgoh.gg/characters/', {
    method: 'GET',
    mode: 'cors',
  })
  const characters = await response.json()
  return characters
}

export const getAbilities = async (): Promise<Ability[]> => {
  const response = await fetch('http://api.swgoh.gg/abilities/', {
    method: 'GET',
    mode: 'cors',
  })
  const abilities = await response.json()
  return abilities
}
