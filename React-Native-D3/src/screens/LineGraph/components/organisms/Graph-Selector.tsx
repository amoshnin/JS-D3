// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, TouchableWithoutFeedback, Text, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

// COMPONENTS IMPORTS //
import { graphs } from "../../utils/data-parse"
import { width } from "../../utils/typings"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  handleSwitchGraph: (index: number) => void
  selectedIndex: Animated.SharedValue<number>
}

const color = "#CACACA"
const GraphSelector: FC<PropsType> = (props) => {
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(BUTTON_WIDTH * props.selectedIndex.value) },
    ],
  }))

  return (
    <View style={styles.wrapper}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.bg_selection, aStyle]} />
      </View>
      {graphs.map((graph, index) => {
        return (
          <TouchableWithoutFeedback
            key={graph.label}
            onPress={() => props.handleSwitchGraph(index)}
          >
            <View style={[styles.label_wrap]}>
              <Text style={styles.label}>{graph.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const SELECTION_WIDTH = width - 32
const BUTTON_WIDTH = (width - 32) / graphs.length
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
    marginBottom: 15,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  bg_selection: {
    backgroundColor: color,
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },

  label_wrap: {
    padding: 16,
    width: BUTTON_WIDTH,
  },

  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default GraphSelector
