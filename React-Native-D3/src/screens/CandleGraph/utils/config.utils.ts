import data from "./data.utils"
import { Dimensions } from "react-native"

import { ICandle } from "../components/chart/candle"

export const candles: Array<ICandle> = data.slice(0, 20)
export const { width: SIZE } = Dimensions.get("window")
export const STEP = SIZE / candles.length
