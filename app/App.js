import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import store from './src/store'
import Home from './src/screens/home'
import Game from './src/screens/game'
import Finish from './src/screens/finish'

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Game" component={Game} options={{title: 'Sugoku'}}></Stack.Screen>
          <Stack.Screen name="Finish" component={Finish}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}