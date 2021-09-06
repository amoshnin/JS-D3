// PLUGINS IMPORTS //
import React from "react"
import Svg from "react-native-svg"

// COMPONENTS IMPORTS //
import Candle from "./candle"

// EXTRA IMPORTS //
import { candles, SIZE } from "../../utils/config.utils"

/////////////////////////////////////////////////////////////////////////////

const Chart = () => {
  return (
    <Svg width={SIZE} height={SIZE}>
      {candles.map((item, index) => (
        <Candle key={item.date} index={index} candle={item} />
      ))}
    </Svg>
  )
}

export default Chart
