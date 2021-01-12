import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://sugoku.herokuapp.com/board?difficulty=random")
      .then(response => {
        return response.json()
      })
      .then(result => {
        setData(result.board)
        
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const encodeBoard = (board) => 
    board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  function solve() {
    console.log("masuk")
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => setData(response.solution))
      .catch(err => console.log(err))
  }

  function validate() {
    console.log('validate')
    console.log(data)
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: data}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }

  function inputHandler(e, idx, i) {
    let temp = data
    console.log(temp)
    temp[idx][i] = Number(e)
    setData(temp)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>Sugoku</Text>
        <View style={styles.hor}>
          {
            data.map((num, idx) => num.map((value, i) => 
              <TextInput
                onChangeText={e => inputHandler(e, idx, i)}
                style={value === 0 ? [styles.center, styles.border, styles.line, {color: 'black'}] : [styles.center, styles.border, styles.line, {color: 'red', fontWeight: 'bold'}]}
                keyboardType='numeric'
                key={[idx,i]}
                maxLength={1}
                editable={(value === 0) ? true : false}
              >{(value === 0) ? "" : value}</TextInput>))
          }
          <Button
            style={styles.button}
            title="solve"
            onPress={() => solve()}
          />
          <Button
            style={styles.button}
            title="validate"
            onPress={() => validate()}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
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
    
  }
});
