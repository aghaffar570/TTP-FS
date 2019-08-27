// import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from '../providers/AuthContext'
import { Redirect } from 'react-router-dom'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'
import Search from './Search'
import axios from 'axios'


import React, { Component } from 'react'

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      trades: [],
      balance: 0,
      profits: 0,
      stocks: [],
    }
    this.id = null
  }

  intervalId = null

  fetchStockData = () => {
    const { currentUser } = this.props
    if(currentUser) {
      firebase.firestore().collection('trades')
        .doc(currentUser.uid).get()
        .then((doc) => {
          if(doc.exists) {
            const { username, balance, profits, trades } = doc.data()
            this.setState({
              username,
              trades,
              balance,
              profits
            })
            return axios.get('https://api.iextrading.com/1.0/tops/last')
          }
        })
        .then(({data}) => {
          const { balance, profits, trades } = this.state
          if(trades.length) {
            const symbols = trades.map(stock => stock.symbol)
            const shares = trades.map(stock => stock.shares)
            const myTrades = data.filter(stock => symbols.includes(stock.symbol))
            let myProfits = 0
            myTrades.forEach((stock, idx) => {
              myProfits += stock.price * shares[idx]
            })
            this.setState({
              stocks: myTrades,
              profits: myProfits
            })
          }
        })
    }
  }

  updateView = value => {
    if(value) this.fetchStockData()
  }

  componentDidMount() {
    this.fetchStockData()

    this.intervalId = setInterval(() => {
      this.fetchStockData()
    }, 100000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const getColor = color => ({
      color,
      width:'90px',
      background: '#eee',
      padding: '2px 4px',
      fontWeight: 900,
      textAlign: 'center'
    })

    const { username, balance, profits, trades, stocks } = this.state
    const { currentUser, match } = this.props
    // console.log('props and state', this.props, this.state);
    if(match.path === '/' && !currentUser.uid) return <Redirect to="/login" />

    return (
      <>
      <Nav />
      <div className="portfolio">
        <div className="trades">
          <h2>{username.toUpperCase()} Portfolio (${(balance + profits).toFixed(3)})</h2>
        {
          stocks.length
          ? stocks.map((stock, idx) => {
            const mTrade = trades.filter(trade => trade.symbol === stock.symbol)[0]
            let colorProp
            let colorSym
            if(mTrade.price === stock.price) {
              colorProp = getColor('grey')
              colorSym = 'grey'
            } else if (mTrade.price < stock.price) {
              colorProp = getColor('green')
              colorSym = 'green'
            } else {
              colorProp = getColor('red')
              colorSym = 'red'
            }
            return (
              <p className="my_trades" key={mTrade.id} >
                <span>
                  <span style={{ color: colorSym, letterSpacing: '1px', fontWeight: 'bold' }}>
                  {stock.symbol}</span>
                  <span> - {mTrade.shares} shares</span>
                </span>
                <span style={colorProp}>${(stock.price).toFixed(3)}</span>
              </p>
            )
          })
          : stocks.length === 0
          ? null
          :'Loading...'
        }
        </div>
        <Search balance={balance} updateView={this.updateView}/>
      </div>
      </>
    )
  }
}




const PortfolioWrapper = (props) => {
  return (
    <AuthContext.Consumer>
      {authProps =>
      <TradeContext.Consumer>
          {tradeProps =>
            <Portfolio {...props} {...authProps} {...tradeProps}/>
        }</TradeContext.Consumer>
      }</AuthContext.Consumer>
  );
}

export default PortfolioWrapper;

