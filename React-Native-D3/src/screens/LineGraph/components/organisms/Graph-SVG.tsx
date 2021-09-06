// PLUGINS IMPORTS //
import React, { FC } from "react"
import Svg, { Path } from "react-native-svg"
import Animated from "react-native-reanimated"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { width } from "../../utils/typings"

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  aProps: { d: string }
}

const AnimatedPath = Animated.createAnimatedComponent(Path)
const GraphSVG: FC<PropsType> = (props) => {
  return (
    <Svg width={width} height={width}>
      <AnimatedPath
        animatedProps={props.aProps}
        fill={"transparent"}
        stroke="black"
        strokeWidth={3}
      />
    </Svg>
  )
}

export default GraphSVG
