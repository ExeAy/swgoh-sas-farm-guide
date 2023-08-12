import React from 'react'
import type { FarmGuideDataPart } from '../model/farm-guide'

export const FarmDataContext = React.createContext<FarmGuideDataPart[]>([])
