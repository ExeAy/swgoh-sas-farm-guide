import React from "react";
import characters from "../data/swgoh/characters.json";
import type { Character } from "../model/character";

// For server side
export const Characters: Character[] = characters;

// For client side
export const CharacterContext = React.createContext<Character[]>([]);
