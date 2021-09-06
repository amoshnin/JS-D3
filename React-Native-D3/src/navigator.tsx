// PLUGINS IMPORTS //
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { setStatusBarHidden } from 'expo-status-bar'

// COMPONENTS IMPORTS //
import Menu from './menu'
import CandleGraph from './screens/CandleGraph'
import LineGraph from './screens/LineGraph'
import GraphLib from './screens/GraphsLib'
import ThemeSelector from './screens/ThemeSelector'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

export const screens = [
  {
    name: 'CandleGraph',
    component: CandleGraph,
  },
  {
    name: 'LineGraph',
    component: LineGraph,
  },
  {
    name: 'GraphLib',
    component: GraphLib,
  },
  {
    name: 'ThemeSelector',
    component: ThemeSelector,
  },
]

const Stack = createStackNavigator()
export default function Navigator() {
  useEffect(() => {
    setStatusBarHidden(true, 'fade')
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Menu'
          component={Menu}
          options={{ headerShown: true }}
        />
        {screens.map((item) => (
          <Stack.Screen name={item.name} component={item.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
