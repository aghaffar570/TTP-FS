import React, { useState, useContext, useCallback } from 'react';
import firebase from '../../config/firebase'
import { TradeContext } from '../providers/TradeContext'

const MakeTrades = ({ stocks }) => {
  const [foundStock, filterStocks] = useState([])
  const { dispatch } = useContext(TradeContext) // make updates to userData in firestore

  const handleSubmit = useCallback(async e => { // make updates to userData in firestore
      e.preventDefault()
      const { symbol, quantity } = e.target.elements
      try {
        // make changes to tradeContext and update firestore
        // await firebase.firestore()
        console.log(symbol, quantity)
      } catch (error) {
        console.error(error)
      }
    }, [])


  return (
    <div>
      <h3>Cash - 5000.00</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symbol"
          placeholder="Tk Symbol"
          onChange={(e) => filterStocks(
            stocks.filter(stock => stock.symbol === e.target.value.toUpperCase())
          )}
          />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
        />
        <button>Bid</button>
      </form>
      {
        foundStock.length ? <p>{foundStock[0].symbol} @ ${foundStock[0].price}/share</p> : null
      }
    </div>
  );
}

export default MakeTrades;
