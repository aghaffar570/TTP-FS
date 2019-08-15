import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './components/layout/Nav'
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import Transactions from './components/trades/Transactions'
import Portfolio from './components/trades/Portfolio'
import firebase from './config/firebase'


export default class App extends Component {
  state = {
    userExists: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('CHECK FOR USER:APP', user)
      if(user) {
        this.setState({ userExists: true })
      } else {
        this.setState({ userExists: false })
      }
    })
  }

  render() {
    const { userExists } = this.state
    if(!userExists) return (
      <div className="App">
        <Nav userExists={userExists}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </div>
    )

    return (
      <div className="App">
        <Nav userExists={userExists}/>
        <Switch>
            <Route exact path="/" component={Portfolio}/>
            <Route path="/portfolio" component={Portfolio}/>
            <Route path="/transactions" component={Transactions}/>
          </Switch>
      </div>
    )
  }
}


