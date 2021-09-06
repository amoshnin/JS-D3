// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { Vector, ReText } from "react-native-redash"
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"

// COMPONENTS IMPORTS //
import Row from "./row"
import { candles, STEP } from "../../utils/config.utils"
import { formatUSD, formatDataTime } from "../../utils/helpers.utils"

// EXTRA IMPORTS //
import { colors } from "../../utils/constants"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  translation: Vector<Animated.SharedValue<number>>
}

const Header: FC<PropsType> = (props) => {
  const candle = useDerivedValue(
    () => candles[Math.floor(props.translation.x.value / STEP)]
  )

  const open = useDerivedValue(() => `${formatUSD(candle.value.open)}`)
  const close = useDerivedValue(() => `${formatUSD(candle.value.close)}`)
  const low = useDerivedValue(() => `${formatUSD(candle.value.low)}`)
  const high = useDerivedValue(() => `${formatUSD(candle.value.high)}`)
  const diff = useDerivedValue(
    () =>
      `${((candle.value.close - candle.value.open) * 100) / candle.value.open}`
  )
  const change = useDerivedValue(
    () =>
      `${
        candle.value.close - candle.value.open < 0
          ? diff.value.substring(0, 5)
          : diff.value.substring(0, 4)
      }%`
  )

  const color = useDerivedValue(() =>
    candle.value.close - candle.value.open > 0
      ? colors.positive
      : colors.negative
  )
  const date = useDerivedValue(() => formatDataTime(candle.value.date))
  return (
    <View style={styles.wrapper}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label={"Open"} value={open} />
          <Row label={"Close"} value={close} />
        </View>
        <View style={styles.divider} />
        <View style={styles.column}>
          <Row label={"High"} value={high} />
          <Row label={"Low"} value={low} />
          <Row label={"Change"} value={change} color={color} />
        </View>
      </View>
      <ReText text={date} style={styles.date_text} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    marginBottom: 30,
  },

  table: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 15,
  },

  date_text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },

  column: {
    flex: 1,
  },

  divider: {
    width: 16,
  },
})

export default Header
