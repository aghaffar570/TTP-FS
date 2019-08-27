import React, { useContext, useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import PrivateRoute from './components/views/PrivateRoute'
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import Transactions from './components/views/Transactions'
import { AuthContext } from './components/providers/AuthContext'
import Portfolio from './components/views/Portfolio'


const App = () => {
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [currentUser]);


  return (
    <div className="App">
      <Switch>
        {
          currentUser && loading &&
          <>
            <Route exact path="/portfolio" component={Portfolio}/>
            <Route exact path="/transactions" component={Transactions}/>
          </>
        }
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={Login} />
      </Switch>
    </div>
  )
}


export default App
