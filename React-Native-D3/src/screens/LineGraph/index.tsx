// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated"
import { mixPath, useVector } from "react-native-redash"

// COMPONENTS IMPORTS //
import GraphHeader from "./components/organisms/Graph-Header"
import GraphFooter from "./components/organisms/Graph-Footer"
import GraphCursor from "./components/organisms/Graph-Cursor"
import GraphSelector from "./components/organisms/Graph-Selector"
import GraphSVG from "./components/organisms/Graph-SVG"

// EXTRA IMPORTS //
import { graphs } from "./utils/data-parse"

/////////////////////////////////////////////////////////////////////////////

const LineGraph = () => {
  const pointTranslation = useVector()
  const transition = useSharedValue(0)
  const previousIndex = useSharedValue(0)
  const currentIndex = useSharedValue(0)

  const handleSwitchGraph = (index: number) => {
    previousIndex.value = currentIndex.value
    transition.value = 0
    currentIndex.value = index
    transition.value = withTiming(1)
  }

  const GraphAnimatedProps = useAnimatedProps(() => {
    const currentPath = graphs[currentIndex.value].data.path
    const previousPath = graphs[previousIndex.value].data.path

    return {
      d: mixPath(transition.value, previousPath, currentPath),
    }
  })

  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <GraphHeader
          selectedIndex={currentIndex}
          pointTranslation={pointTranslation}
        />
        <View>
          <GraphSVG aProps={GraphAnimatedProps} />
          <GraphCursor
            selectedIndex={currentIndex}
            pointTranslation={pointTranslation}
          />
        </View>
      </View>
      <View>
        <GraphSelector
          selectedIndex={currentIndex}
          handleSwitchGraph={handleSwitchGraph}
        />
        <GraphFooter />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default LineGraph
