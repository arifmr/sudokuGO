import React, {useEffect}  from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'


export default function Finish({route}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {name, difficulty, condition, score} = route.params
  const leaderboards = useSelector(state => state.leaderboards)
  console.log(leaderboards, '<<<<')

  function move(screen) {
    if (screen === "Home") {
      navigation.navigate("Home")
    } else {
      navigation.replace("Game", {
        name,
        difficulty
      })
    }
  }
  if (condition === 'win') {
    return (
      <View style={styles.container}>
        <View>
          <Text>Leader Boards:</Text>
          <Text>{name}: {score}</Text>
        </View>
        <Text>Congaratulation {name} !!</Text>
        <Text>You've conquered Sugoku {difficulty} level!!</Text>
        <TouchableOpacity style={styles.button} title="Back To Home" onPress={() => move("Home")}><Text>Back To Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Play Again" onPress={() => move("Game")}><Text>Play Again</Text></TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Text>Leader Boards:</Text>
          <Text>{name}: {score}</Text>
        </View>
        <Text>Dont be sad, {name} !!</Text>
        <Text>You've failed Sugoku {difficulty} level!!</Text>
        <TouchableOpacity style={styles.button} title="Back To Home" onPress={() => move("Home")}><Text>Back To Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Play Again" onPress={() => move("Game")}><Text>Play Again</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hor: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    paddingBottom: 0
  },
  border: {
    borderWidth: 1
  },
  line: {
    width: 35
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20  
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    margin: 5,
    padding: 10
  }
});