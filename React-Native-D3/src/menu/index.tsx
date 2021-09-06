// PLUGINS IMPORTS //
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, StyleSheet } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { screens } from "../navigator"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

export default function Menu() {
  const navigation = useNavigation()

  return (
    <ScrollView>
      {screens.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.row}
          onPress={() => navigation.navigate(item.name)}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: "silver",
    paddingHorizontal: 10,
    marginVertical: 0.4,
  },
})
