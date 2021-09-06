// PLUGINS IMPORTS //
import React, { FC } from "react"
import { Line, Rect } from "react-native-svg"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { STEP } from "../../utils/config.utils"
import { scaleY, scaleBody } from "../../utils/helpers.utils"
import { colors } from "../../utils/constants"

/////////////////////////////////////////////////////////////////////////////

export type ICandle = {
  date: string
  day: number
  open: number
  high: number
  low: number
  close: number
}

interface PropsType {
  candle: ICandle
  index: number
}

const MARGIN = 2
const Candle: FC<PropsType> = (props) => {
  const { open, close, high, low } = props.candle
  const fill = close > open ? colors.positive : colors.negative
  const x = props.index * STEP

  const max = Math.max(open, close)
  const min = Math.min(open, close)

  return (
    <>
      <Line
        x={x + MARGIN}
        x1={x + STEP / 2}
        y1={scaleY(low)}
        x2={x + STEP / 2}
        y2={scaleY(high)}
        strokeWidth={1}
        fill={fill}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY(max)}
        width={STEP - MARGIN * 2}
        height={scaleBody(max - min)}
        fill={fill}
      />
    </>
  )
}

export default Candle
