import React, { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../providers/AuthContext'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import lodash from 'lodash'
import uuid from 'uuid/v1'
import { buyShares } from '../reducers/TradeReducer'
import axios from 'axios';


const Search = ({ balance, updateView }) => {

  const [searchResult, changeResult] = useState({})
  const [stockSym, setStockSym] = useState('')

  const { currentUser } = useContext(AuthContext)
  const { userData, dispatch } = useContext(TradeContext)

  const handleSubmit = useCallback(async (e, stock) => {
      e.preventDefault()
      const { symbol, quantity } = e.target.elements
      try {
        const shares = Math.floor(quantity.value)
        const cost = shares * stock.price
        if(stock.symbol && currentUser) {
          stock.shares = shares
          stock.id = uuid()
          const userDoc = await firebase.firestore()
            .collection('trades').doc(currentUser.uid).get()

          const { username, balance, profits, trades } = userDoc.data()
          if(userDoc.exists && cost < balance) {
            console.log(stock, cost, userDoc.data(), '$$$');

            firebase.firestore()
              .collection('trades').doc(currentUser.uid).update({
                trades: [ ...trades, stock],
                balance: balance - cost
              })
          }
        }
        quantity.value = ""
        symbol.value = ""
        changeResult([])
        setStockSym('')
        updateView(true)
      } catch (error) {
        console.error(error)
      }
    }, [])


  const handleChange = useCallback(async e => {
    try {
      const input = e.target.value.toUpperCase()
      setStockSym(input)
        if(input.length) {
          const { data } = await axios.get(`https://api.iextrading.com/1.0/tops/last?symbols=${input}`)
          if(data.length) {
            changeResult(data[0])
          }
        }
        else {
          changeResult({})
        }

    } catch (error) {
      console.error(error)
    }
  }, [searchResult])

  return (
    <div className="search">
      <h3>Balance - {balance}</h3>
      <form onSubmit={(e) => handleSubmit(e, searchResult)}>
        <input
          type="text"
          name="symbol"
          placeholder="Tk Symbol"
          onChange={handleChange}
          value={stockSym}
          />
        <input
          type="number"
          min="1"
          name="quantity"
          placeholder="Quantity"
        />
        <button>Bid</button>
      </form>
      {
        searchResult.symbol
        ? <p className="my_trades">{searchResult.symbol} @ ${searchResult.price}/share</p>
        : null
      }
    </div>
  );
}

export default Search;
