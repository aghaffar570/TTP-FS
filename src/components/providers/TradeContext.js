import React, { useReducer, createContext } from 'react'
import tradeReducer from '../reducers/TradeReducer';

export const TradeContext = createContext()

export function TradeProvider({ children }) {
  const [trades, dispatch] = useReducer(tradeReducer, {})

  return (
    <TradeContext.Provider value={{ trades, dispatch }}>
      { children }
    </TradeContext.Provider>
  )
}

