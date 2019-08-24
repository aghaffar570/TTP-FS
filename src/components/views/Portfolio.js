import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from '../providers/AuthContext'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import axios from 'axios'
import Trade from './Trade'
import Nav from '../layouts/Nav'


const Portfolio = () => {
  const { currentUser } = useContext(AuthContext)
  const { trades, dispatch } = useContext(TradeContext)

  const [isLoading, setLoadingStatus] = useState(false)
  const [stocks, setStocks] = useState([])

  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)
  const [profits, setProftis] = useState(0)


  useEffect(() => { // get user data from Firestore
    firebase.firestore().collection('trades').doc(currentUser.uid).get()
      .then((userDoc) => {
        if(userDoc.exists) {
          const userData = userDoc.data()
          setUsername(userData.username)
          setBalance(userData.balance)
          setProftis(userData.profits + userData.balance)
          console.log('userCC', currentUser, );
        }
      })
  })


  useEffect(() => { // get stock data fro API
    setLoadingStatus(true)
    axios.get(`https://api.iextrading.com/1.0/tops/last`)
      .then(({data}) => {
        setStocks(data)
      })
      .then(() => {
        setLoadingStatus(false)
      })
  }, [])


  if(isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Nav />
      <h2>{username.toUpperCase()} Portfolio (${profits})</h2>
      {
        stocks.length
        // !!stocks.length &&
        // stocks.slice(0, 10).map(stock => {
        //   <p key={stock.symbol}>{stock.symbol} is now at ${stock.price}</p>
        // })
        /**
         * list all trades made here
         */
      }
      <Trade stocks={stocks} balance={balance}/>
    </div>
  )
}

export default Portfolio

