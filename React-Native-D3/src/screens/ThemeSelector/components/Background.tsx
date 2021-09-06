// PLUGINS IMPORTS //
import React, { useEffect, useRef } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { IColor } from "../constants"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

export interface IColorSelection {
  previous: IColor
  current: IColor
  position: { x: number; y: number }
}

const { width, height } = Dimensions.get("screen")
const RADIUS = 45
export default function Background({
  colorSelection,
}: {
  colorSelection: IColorSelection
}) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = 0
    progress.value = withTiming(1, {
      duration: 650,
      easing: Easing.inOut(Easing.ease),
    })
  }, [colorSelection])

  const MAX_RADIUS =
    (Math.sqrt(2) *
      Math.max(
        width + colorSelection.position.x,
        height + colorSelection.position.y
      )) /
    2

  const style = useAnimatedStyle(() => ({
    left: -RADIUS + colorSelection.position.x,
    top: -RADIUS + colorSelection.position.y,
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: colorSelection.current.start,
    transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
  }))

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: colorSelection.previous.start },
      ]}
    >
      <Animated.View style={style} />
    </View>
  )
}

const styles = StyleSheet.create({})
