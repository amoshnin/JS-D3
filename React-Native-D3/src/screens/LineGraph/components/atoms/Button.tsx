// PLUGINS IMPORTS //
import React, { FC, ComponentProps } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  label: string
  icon: ComponentProps<typeof Feather>["name"]
}

const width = (Dimensions.get("window").width - 64) / 2
const Button: FC<PropsType> = (props) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.wrapper}>
        <Feather
          color="white"
          name={props.icon}
          size={18}
          style={styles.icon}
        />
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 16,
    width: width,
  },

  icon: {
    marginRight: 8,
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Button
