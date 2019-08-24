import React, { useState, createContext } from 'react'
import firebase from '../../config/firebase'

export const TradeContext = createContext()

export function TradeProvider({ children }) {
  const [tradeSymbol, setTradeSymbol] = useState('')
  const [tradeQuantity, setTradeQuantity] = useState(0)

  const value = {
    tradeSymbol,
    tradeQuantity,
    setTradeSymbol,
    setTradeQuantity
  }

  return (
    <TradeContext.Provider value={value}>
      { children }
    </TradeContext.Provider>
  )
}

