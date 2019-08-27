import React, { useState, useContext, useEffect, useCallback } from 'react'
import firebase from '../../config/firebase'
import { TradeContext } from '../providers/TradeContext'
import { AuthContext } from '../providers/AuthContext'
import Nav from '../layouts/Nav'

const Transactions = () => {
  const { currentUser } = useContext(AuthContext)
  const [ trades, setTrades ] = useState([])
  const [ username, setUsername ] = useState('')

  useEffect(() => {
    if(currentUser) {
      firebase.firestore().collection('trades')
        .doc(currentUser.uid).get()
        .then((doc) => {
          if(doc.exists) {
            const { username, balance, profits, trades } = doc.data()
            setUsername(username)
            setTrades(trades)
          }
        })
      }
  })

  return (
    <>
      <Nav />
      <div className="transaction">
        <h2>Transactions</h2>
        {
          trades.length
          ? trades.map((stock, idx) =>
              <p className="my_trades" key={stock.id} >
                {stock.shares} shares of {stock.symbol} at ${(stock.price).toFixed(2)}
              </p>
          )
          : null
        }
      </div>
    </>
  )
}

export default Transactions
