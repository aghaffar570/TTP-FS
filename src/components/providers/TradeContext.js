import React, { useReducer, createContext } from 'react'
import tradeReducer from '../reducers/TradeReducer';

export const TradeContext = createContext()

export function TradeProvider({ children }) {
  const [userData, dispatch] = useReducer(tradeReducer, {})

  return (
    <TradeContext.Provider value={{ userData, dispatch }}>
      { children }
    </TradeContext.Provider>
  )
}

