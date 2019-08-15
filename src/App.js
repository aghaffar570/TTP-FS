import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './components/layout/Nav'
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import Transactions from './components/trades/Transactions'
import Portfolio from './components/trades/Portfolio'


function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
          <Route exact path="/" component={Portfolio}/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/transactions" component={Transactions}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
        </Switch>
    </div>
  )
}

export default App
