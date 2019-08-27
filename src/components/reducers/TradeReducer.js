import firebase from '../../config/firebase'

const initialState = {
  username: '',
  trades: [],
  profits: 0,
  balance: 0,
}



const createNewUserData = async (state, userId, username ) => {
  await firebase.firestore().collection('trades').doc(userId).set({
    username,
    trades: [],
    profits: 0,
    balance: 5000
  })
  return { ...state, username, balance: 5000 }
}

const getUserData = async (state, userId) => {
  console.log('getuserdata reducer', userId);
  const userDoc = await firebase.firestore().collection('trades').doc(userId).get()
  if(userDoc.exists) {
    const { username, balance, profits, trades } = userDoc.data()
    return {
      ...state,
      username,
      trades,
      balance,
      profits: profits + balance
    }
  }
}


const buyShares = (state, balance, stock, buy, userId) => {
  console.log('buy shares reducer');

  // getUserData(state, userId)
  //   .then(userData => {
  //     console.log(userData, 'usersDAta');
  //     firebase.firestore().collection('trades').doc(userId).update({
  //       balance,
  //       trades: [ ...userData.trades, ...stock]
  //     })
  //   })
  //   .finally(result => {
  //     console.log('result data', result)
  //   })
  // return { ...state, trades: [ ...stock], balance, test: 'test data' }
}


const TradeReducer = (state = initialState, action) => {
  console.log('action in trade reducer', action)
  switch (action.type) {
    case 'CREATE_NEW_USER_DATA':
      return createNewUserData(state, action.userId, action.username)
    case 'GET_USER_DATA':
      return getUserData(state, action.userId)
    case 'BUY_SHARES':
      return //buyShares(state, action.balance, action.stock, action.buy, action.userId)
    case 'SELL_SHARES':
      return { ...state, }
    default:
      return state
  }
}


export default TradeReducer
