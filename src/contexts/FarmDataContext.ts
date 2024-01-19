import React from "react"
import farmGuideData from "../data/ros/farm-guide-data.json"
import type { FarmGuideDataPart } from "../model/farm-guide"

// For server side
export const FarmGuideData: FarmGuideDataPart[] = farmGuideData

// For client side
export const FarmDataContext = React.createContext<FarmGuideDataPart[]>([])
