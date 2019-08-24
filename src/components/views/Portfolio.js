import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from '../providers/AuthContext'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'
import Trade from './Trade'
import axios from 'axios'


const Portfolio = () => {
  const { currentUser } = useContext(AuthContext)
  const { userData, dispatch } = useContext(TradeContext)

  const [isLoading, setLoadingStatus] = useState(false)
  const [stocks, setStocks] = useState([])

  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)
  const [profits, setProftis] = useState(0)


  useEffect(() => { // get user data from Firestore
    if(currentUser) {
      firebase.firestore().collection('trades').doc(currentUser.uid).get()
        .then((userDoc) => {
          if(userDoc.exists) {
            const docData = userDoc.data()
            setUsername(docData.username)
            setBalance(docData.balance)
            setProftis(docData.profits + docData.balance)
            console.log('userCC', currentUser, docData);
          }
        })
    }
  })


  useEffect(() => { // get stock data from API
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
        console.log('userDAta after dispatch', userData)
      }

      {
        // have all the stock data, but only visible in Trade when making queries
        stocks.length
        // !!stocks.length &&
        // stocks.slice(0, 10).map(stock => {
        //   <p key={stock.symbol}>{stock.symbol} is now at ${stock.price}</p>
        // })
        /**
         * list all trades made here
         */
      }
      <Trade stocks={stocks} balance={balance} />
    </div>
  )
}

export default Portfolio

