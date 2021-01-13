export function getBoard(difficulty) {
  return (dispatch, getState) => {
    fetch("https://sugoku.herokuapp.com/board?difficulty="+difficulty)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: "set-boards",
        payload: res.board
      })
      dispatch({
        type: "set-initboard",
        payload: res.board
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function solveBoard(data) {
  return (dispatch, getState) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: data}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => 
      dispatch({
        type: 'set-boards',
        payload: response.solution
      }))
    .catch(err => console.log(err))
  }
}

export function validateBoard(data, user) {
  return (dispatch, getState) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: data}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'solved') {
        dispatch({
          type: 'set-validate',
          payload: response.status
        })
        setLeaderBoard(user)
      } else {
        alert(response.status)
      }
    })
    .catch(err => console.log(err))
  }
}

export function setLeaderBoard(data) {
  console.log(data)
  return (dispatch, getState) => {
    dispatch({
      type: 'set-leaderboards',
      payload: data
    })
  }
}

const encodeBoard = (board) => 
    board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');