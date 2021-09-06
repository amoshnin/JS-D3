// PLUGINS IMPORTS //
import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated"
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////
const { width } = Dimensions.get("screen")

export interface IPosition {
  x: number
  y: number
}

interface IProps {
  index: number
  gradient: {
    start: string
    end: string
  }
  translateX: Animated.SharedValue<number>
  onPress: (position: IPosition) => void
}

export const COLOR_WIDTH = width / 3
const RADIUS = 45

export default function Circle({
  index,
  translateX,
  gradient,
  ...restProps
}: IProps) {
  const inputRange = [
    -COLOR_WIDTH * (index + 1),
    -COLOR_WIDTH * index,
    -COLOR_WIDTH * (index - 1),
  ]

  const style = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [100, 0, -100],
      Extrapolate.CLAMP
    )

    const scale = interpolate(translateX.value, inputRange, [0.7, 1, 0.7])
    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    }
  })

  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onActive: ({ absoluteX: x, absoluteY: y }) => {
        runOnJS(restProps.onPress)({ x, y })
      },
    }
  )

  return (
    <Animated.View style={[styles.wrapper, style]}>
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <LinearGradient
            style={styles.gradient}
            colors={[gradient.start, gradient.end]}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: COLOR_WIDTH,
    alignItems: "center",
  },

  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderWidth: 6,
    borderColor: "white",
  },
})
