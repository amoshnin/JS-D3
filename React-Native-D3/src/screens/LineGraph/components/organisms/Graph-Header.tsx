// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import Animated, {
  useDerivedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Vector, ReText } from "react-native-redash"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { graphs } from "../../utils/data-parse"
import { width } from "../../utils/typings"
import ETH from "../../assets/ETH"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  selectedIndex: Animated.SharedValue<number>
  pointTranslation: Vector<Animated.SharedValue<number>>
}

const GraphHeader: FC<PropsType> = ({ selectedIndex, pointTranslation }) => {
  const data = useDerivedValue(() => graphs[selectedIndex.value].data)
  const price = useDerivedValue(() => {
    const p = interpolate(
      pointTranslation.y.value,
      [0, width],
      [data.value.maxPrice, data.value.minPrice]
    )

    return `$ ${Number(p.toFixed(2)).toLocaleString("en-US", {
      currency: "USD",
    })}`
  })

  const percentChange = useDerivedValue(
    () => `${data.value.percentChange.toFixed(3)} %`
  )

  const label = useDerivedValue(() => data.value.label)
  const style = useAnimatedStyle(
    () => ({
      color: data.value.percentChange > 0 ? "green" : "red",
    }),
    [data.value]
  )

  return (
    <View style={styles.wrapper}>
      <ETH />
      <View style={styles.container}>
        <View>
          <ReText style={styles.value} text={price} />
          <Text style={styles.label}>Etherum</Text>
        </View>
        <View>
          <ReText
            style={[
              styles.value,
              { color: data.value.percentChange > 0 ? "green" : "red" },
              style,
            ]}
            text={percentChange}
          />
          <ReText style={[styles.label, { textAlign: "right" }]} text={label} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  container: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "500",
    fontSize: 24,
    textAlign: "right",
  },
  label: {
    fontSize: 18,
  },
})

export default GraphHeader
