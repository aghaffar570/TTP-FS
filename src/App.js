import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/views/PrivateRoute'
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import Transactions from './components/views/Transactions'
import Portfolio from './components/views/Portfolio'


const App = () => {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Portfolio} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/portfolio" component={Portfolio}/>
        <Route exact path="/transactions" component={Transactions}/>
      </Switch>
    </div>
  )
}


export default App
