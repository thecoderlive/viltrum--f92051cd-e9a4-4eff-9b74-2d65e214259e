import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from './Home'
import Video from './Video'
import Channel from './Channel'
import History from './History'

const Root = createStackNavigator()

export default function App() {
return (
<NavigationContainer>
<Root.Navigator
    initialRouteName="Home"
    screenOptions={{
        headerMode:'screen',
        headerStyle: { backgroundColor: 'whitesmoke', height: 40 },
        title: null,
        cardOverlayEnabled:true,
        cartStyle:{flex:1},
        animationEnabled:true,
        gestureEnabled:true
    }}
    >
<Root.Screen name="Home" component={Home} />
<Root.Screen name="Video" component={Video} />
<Root.Screen name="Channel" component={Channel} />
<Root.Screen name="History" component={History} />
</Root.Navigator>
<Text style={{height: 1}}>.</Text>
</NavigationContainer>
)}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
})