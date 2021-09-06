import { round } from "react-native-redash"
import { ICandle } from "../components/chart/candle"
import { candles, SIZE } from "./config.utils"
import { scaleLinear } from "d3-scale"

export const formatUSD = (value: number) => {
  "worklet"
  return `$ ${round(value, 2).toLocaleString("en-US", { currency: "USD" })}`
}

export const formatDataTime = (value: string) => {
  "worklet"
  const date = new Date(value)
  return date.toLocaleTimeString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const getDomain = (rows: Array<ICandle>): [number, number] => {
  "worklet"
  const values = rows.map(({ high, low }) => [high, low]).flat()
  return [Math.min(...values), Math.max(...values)]
}

export const DOMAIN = getDomain(candles)
export const scaleY = (value: number) => {
  "worklet"
  return scaleLinear().domain(DOMAIN).range([SIZE, 0])(value)
}

export const scaleBody = (value: number) => {
  "worklet"
  return scaleLinear()
    .domain([0, Math.max(...DOMAIN) - Math.min(...DOMAIN)])
    .range([0, SIZE])(value)
}
