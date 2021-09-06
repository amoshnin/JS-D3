// PLUGINS IMPORTS //
import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import { Vector, clamp } from "react-native-redash"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated"

// COMPONENTS IMPORTS //
import Line from "./line"

// EXTRA IMPORTS //
import { SIZE } from "../../utils/config.utils"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  opacity: Animated.SharedValue<number>
  translation: Vector<Animated.SharedValue<number>>
}

const ShallowChart: FC<PropsType> = (props) => {
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x, y }) => {
      props.opacity.value = 1
      props.translation.x.value = clamp(x, 0, SIZE)
      props.translation.y.value = clamp(y, 0, SIZE)
    },

    onEnd: () => {
      props.opacity.value = 0
    },
  })

  const horizontalStyle = useAnimatedStyle(() => ({
    opacity: props.opacity.value,
    transform: [{ translateY: props.translation.y.value }],
  }))

  const verticalStyle = useAnimatedStyle(() => ({
    opacity: props.opacity.value,
    transform: [{ translateX: props.translation.x.value }],
  }))

  return (
    // minDist = minimum distance a finger needs to travel to active gesture
    <PanGestureHandler minDist={0} onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, horizontalStyle]}>
          <Line x={SIZE} y={0} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, verticalStyle]}>
          <Line x={0} y={SIZE} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default ShallowChart
