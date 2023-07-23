import React from 'react'
import type { Character } from '../model/character'

export const CharacterContext = React.createContext<Character[]>([])
