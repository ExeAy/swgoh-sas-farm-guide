import React from "react";
import abilities from "../data/swgoh/abilities.json";
import type { Ability } from "../model/ability";

// For server side
export const Abilities: Ability[] = abilities;

// For client side
export const AbilitiesContext = React.createContext<Ability[]>([]);
