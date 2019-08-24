import React, { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../providers/AuthContext'
import { TradeContext } from '../providers/TradeContext'

const MakeTrades = ({ stocks, balance }) => {
  const [foundStock, filterStocks] = useState([])


  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(TradeContext) // make updates to userData in firestore





  const handleSubmit = useCallback(async (e, stock, balance) => { // make updates to userData in firestore
      e.preventDefault()
      const { symbol, quantity } = e.target.elements
      try {
        console.log(stock, 'foundsotck');

        // const stock = foundStock[0]
        console.log(quantity.value, stock[0].price, balance);

        const cost = Math.floor(quantity.value * stock[0].price)
        if(stock.length && currentUser) {
          stock[0].shares = Math.floor(quantity.value)
          dispatch({
            type: 'BUY_SHARES', balance: balance - cost, stock, userId: currentUser.uid
          })

          quantity.value = ""
          symbol.value = ""
          filterStocks([])
        }
      } catch (error) {
        console.error(error)
      } finally {

      }
    }, [])


  return (
    <div>
      <h3>Balance - {balance}</h3>
      <form onSubmit={(e) => handleSubmit(e, foundStock, balance)}>
        <input
          type="text"
          name="symbol"
          placeholder="Tk Symbol"
          onChange={(e) => filterStocks(
            stocks.filter(stock =>
              stock.symbol === e.target.value.toUpperCase())
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
        foundStock.length
        ? <p>{foundStock[0].symbol} @ ${foundStock[0].price}/share</p>
        : null
      }
    </div>
  );
}

export default MakeTrades;
