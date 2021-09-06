// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { Vector, getYForX } from "react-native-redash"
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { graphs } from "../../utils/data-parse"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  selectedIndex: Animated.SharedValue<number>
  pointTranslation: Vector<Animated.SharedValue<number>>
}

const GraphCursor: FC<PropsType> = ({ selectedIndex, pointTranslation }) => {
  const isActive = useSharedValue(false)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true
    },
    onActive: (event) => {
      pointTranslation.x.value = event.x
      pointTranslation.y.value = getYForX(
        graphs[selectedIndex.value].data.path,
        pointTranslation.x.value
      )
    },
    onEnd: () => {
      isActive.value = false
    },
  })

  const style = useAnimatedStyle(() => {
    const translateX = pointTranslation.x.value - CURSOR_SIZE / 2
    const translateY = pointTranslation.y.value - CURSOR_SIZE / 2

    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1 : 0) },
      ],
    }
  })

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.wrapper, style]}>
            <View style={styles.body} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const CURSOR_SIZE = 50
const styles = StyleSheet.create({
  wrapper: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE / 2,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "black",
  },
})

export default GraphCursor
