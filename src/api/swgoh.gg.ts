import type { Character } from '../model/character'

export const getCharacters = async (): Promise<Character[]> => {
  console.log('getCharacters')
  const response = await fetch('http://api.swgoh.gg/characters/', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('response', response)
  const characters = await response.json()
  return characters
}
