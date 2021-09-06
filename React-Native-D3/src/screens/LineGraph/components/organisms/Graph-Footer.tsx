// PLUGINS IMPORTS //
import React, { FC } from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { Button } from "../atoms"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {}

const GraphFooter: FC<PropsType> = () => {
  return (
    <View style={styles.wrapper}>
      <Button icon="repeat" label="Swap" />
      <Button icon="send" label="Send" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default GraphFooter
