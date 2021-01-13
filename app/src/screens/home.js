import React, {useState} from 'react';
import {useDispatch}from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {getBoard} from '../store/action'

export default function Home() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function move(difficulty) {
    dispatch({
      type: 'set-validate',
      payload: ''
    })
    if (!name) {
      setName("Guest")
      dispatch(getBoard(difficulty))
      navigation.navigate('Game', {
        name,
        difficulty
      })
    } else {
      dispatch(getBoard(difficulty))
      navigation.navigate('Game', {
        name,
        difficulty
      })
    }
  }

  function nameHandler(e) {
    setName(e)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.text}>Welcome to Sugoku</Text>
        <TouchableOpacity style={styles.button} onPress={() => move()}><Text>Leaderboard</Text></TouchableOpacity>
      </View>
      <Text>Name: </Text>
      <TextInput
        style={[styles.input, {textAlign: 'center'}]} 
        onChangeText={e => nameHandler(e)}  
        placeholder="Put Your Name"
      />
      <Text>Choose Level:</Text>
      <View style={[{marginBottom: 50}]}>
        <TouchableOpacity style={styles.button} onPress={() => move("easy")}><Text>Easy</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => move("medium")}><Text>Medium</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => move("hard")}><Text>Hard</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => move("random")}><Text>Random</Text></TouchableOpacity>
      </View>
    </View>
  )
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
    flexDirection: "row"
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
  input: {
    width: 150,
    height: 35,
    borderWidth: 1,
    marginBottom: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    margin: 5,
    padding: 10
  }
});