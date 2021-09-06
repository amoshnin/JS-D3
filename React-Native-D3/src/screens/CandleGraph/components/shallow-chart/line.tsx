// PLUGINS IMPORTS //
import React, { FC } from "react"
import Svg, { Line } from "react-native-svg"
import { colors } from "../../utils/constants"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  x: number
  y: number
}

const ChartLine: FC<PropsType> = (props) => {
  return (
    <Svg>
      <Line
        x1={0}
        y1={0}
        x2={props.x}
        y2={props.y}
        strokeWidth={2}
        stroke={colors.grey}
        strokeDasharray={"6 6"}
      />
    </Svg>
  )
}

export default ChartLine
