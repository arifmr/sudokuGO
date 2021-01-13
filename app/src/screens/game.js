import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import CountDown from 'react-native-countdown-component';
import {solveBoard, validateBoard, setLeaderBoard} from '../store/action'
const {width} = Dimensions.get('window');

export default function Game({route}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {name, difficulty} = route.params
  const data = useSelector(state => state.boards)
  const init = useSelector(state => state.initboard)
  const status = useSelector(state => state.status)
  const [score, setScore] = useState('')

  useEffect(() => {
    if (status === 'solved') {
      navigation.replace('Finish', {
        name,
        difficulty,
        condition: 'win',
        score
      })
    }
  }, [status])

  function timeout() {
    alert('Time Out !!!')
    navigation.replace('Finish', {
      name,
      difficulty,
      condition: 'lose',
      score: 0
    })
  }

  function solve() {
    dispatch(solveBoard(data))
  }

  function validate() {
    const user = {
      name,
      score: (difficulty === 'hard' || 'random') ? 30 : (difficulty === 'medium') ? 20 : 10
    }
    setScore(user.score)
    dispatch(validateBoard(data, user))
    if (status === "solved") {
      dispatch({
        type: 'set-validate',
        payload: 'unsolved'
      })
    }
  }

  function inputHandler(e, idx, i) {
    let temp = JSON.parse(JSON.stringify(data))
    temp[idx][i] = Number(e)
    dispatch({
      type: "set-boards",
      payload: temp
    })
  }

  if (!init.length) {
   return (
     <View>
       <Text style={styles.center}>Hi {name}, Please Wait For A Sec...</Text>
     </View>
   ) 
  }
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Sugoku</Text>
        <CountDown
          size={15}
          until={20}
          onFinish={() => timeout()}
          digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
          digitTxtStyle={{color: '#1CC625'}}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{color: '#1CC625'}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
        />
        <View style={styles.hor}>
          {
            data.map((num, idx) => num.map((value, i) => 
              <TextInput
                onChangeText={e => inputHandler(e, idx, i)}
                style={init[idx][i] === 0 ? [styles.border, styles.text1] : [styles.border, styles.text2]}
                keyboardType='numeric'
                key={[idx,i]}
                maxLength={1}
                editable={(init[idx][i] === 0) ? true : false}
              >{(value === 0) ? "" : value}</TextInput>))
          }
        </View>
        <View style={styles.flex}>
          <TouchableOpacity style={styles.button} title="solve" onPress={() => solve()}><Text>Solve</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} title="validate" onPress={() => validate()}><Text>Submit</Text></TouchableOpacity>
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  border: {
    borderWidth: 1,
    width: (width - 30)/9,
    textAlign: 'center'
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
    marginBottom: 10
  },
  button: {
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 70,
    padding: 0,
    width: width/6,
    backgroundColor: "#DDDDDD",
    alignItems: 'center'
  },
  text1: {
    color: 'black'
  },
  text2: {
    color: 'red', fontWeight: 'bold'
  },
  flex : {
    flex: 1,
    flexDirection: "row",
  }
});