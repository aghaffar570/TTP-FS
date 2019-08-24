const initialState = {

}



const TradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHARES':
      return {...state, }
    case 'BUY_SHARES':
      return { ...state, }
    case 'SELL_SHARES':
      return { ...state, }
    default:
      return state
  }
}


export default TradeReducer
