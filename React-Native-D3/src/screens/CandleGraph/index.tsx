// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useVector } from "react-native-redash"

// COMPONENTS IMPORTS //
import Header from "./components/header"
import Chart from "./components/chart"
import ShallowChart from "./components/shallow-chart"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const CandleChart = () => {
  const opacity = useSharedValue(0)
  const translation = useVector()

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header translation={translation} />
      <View
        style={{
          backgroundColor: "#0E0E0F",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          flex: 1,
        }}
      >
        <Chart />
        <ShallowChart opacity={opacity} translation={translation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "black", flex: 1 },
})

export default CandleChart
