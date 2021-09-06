import { Dimensions } from "react-native"
import { Path as PathType } from "react-native-redash"

export const { width } = Dimensions.get("window")
export interface IAmount {
  amount: string
  currency: string
  scale: string
}

export interface IPercentChange {
  hour: number
  day: number
  week: number
  month: number
  year: number
}

export interface ILatestPrice {
  amount: IAmount
  timestamp: string
  percent_change: IPercentChange
}

export type Price = [string, number]
export type PriceList = [string, number][]

export interface IDataPoints {
  percent_change: number
  prices: PriceList
}

export interface IPrices {
  latest: string
  latest_price: ILatestPrice
  hour: IDataPoints
  day: IDataPoints
  week: IDataPoints
  month: IDataPoints
  year: IDataPoints
  all: IDataPoints
}

export interface Data {
  base: string
  base_id: string
  unit_price_scale: number
  currency: string
  prices: IPrices
}

export interface IGraphPath {
  label: string
  minPrice: number
  maxPrice: number
  percentChange: number
  path: PathType
}

export interface IGraphData {
  label: string
  value: number
  data: IGraphPath
}
