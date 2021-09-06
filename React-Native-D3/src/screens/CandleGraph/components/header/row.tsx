// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ReText } from "react-native-redash"
import Animated, { useAnimatedStyle } from "react-native-reanimated"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  label: string
  color?: Animated.SharedValue<string>
  value: Animated.SharedValue<string>
}

const Row: FC<PropsType> = (props) => {
  const style = useAnimatedStyle(() => ({
    color: props.color && props.color.value,
  }))

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{props.label}</Text>
      <ReText text={props.value} style={[styles.text, style]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 20,
    color: "grey",
  },

  text: {
    fontSize: 20,
    fontVariant: ["tabular-nums"],
    color: "white",
  },
})

export default Row
