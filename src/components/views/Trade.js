import React from 'react'

const Trade = ({ stock }) => {
  return <p>{stock.symbol} @ ${stock.price}/share</p>
}

export default Trade
