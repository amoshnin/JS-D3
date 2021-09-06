import data from "./data.json"
import { IPrices, IDataPoints, width, IGraphPath, IGraphData } from "./typings"
import { parse } from "react-native-redash"
import { scaleLinear } from "d3-scale"
import * as shape from "d3-shape"

const POINTS = 60
const values = data.data.prices as IPrices

const buildGraph = (datapoints: IDataPoints, label: string): IGraphPath => {
  // 1) Format data
  const priceList = datapoints.prices.slice(0, POINTS)
  const formattedValues = priceList.map(
    (price) => [parseFloat(price[0]), price[1]] as [number, number]
  )

  // 2) Sepparete data in Y and X axis
  const prices = formattedValues.map((value) => value[0])
  const dates = formattedValues.map((value) => value[1])

  // 3) Define scaleX and scaleY (using max and min values of each dataset)
  // scale X
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)
  const scaleX = scaleLinear().domain([minDate, maxDate]).range([0, width])

  // scale Y
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([width, 0])

  // 4) Define path
  const path = parse(
    shape
      .line()
      .x(([, x]) => scaleX(x))
      .y(([y]) => scaleY(y))
      .curve(shape.curveBasis)(formattedValues) as string
  )

  return {
    label,
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path,
  }
}

export const graphs: Array<IGraphData> = [
  {
    label: "1H",
    value: 0,
    data: buildGraph(values.hour, "Last Hour"),
  },
  {
    label: "1D",
    value: 1,
    data: buildGraph(values.day, "Today"),
  },
  {
    label: "1M",
    value: 2,
    data: buildGraph(values.month, "Last Month"),
  },
  {
    label: "1Y",
    value: 3,
    data: buildGraph(values.year, "This Year"),
  },
  {
    label: "all",
    value: 4,
    data: buildGraph(values.all, "All time"),
  },
]
