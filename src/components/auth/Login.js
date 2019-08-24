import React, { useContext, useCallback } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { AuthContext } from '../providers/AuthContext'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(TradeContext)

  const handleLogin = useCallback(e => {
    e.preventDefault()
    const { email, password } = e.target.elements
    try {
      firebase.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        // .then(({ user }) => {
        //   dispatch({ type: 'GET_USER_DATA',  userId: user.uid })
        // })
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }, [history])

  if(currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Nav />
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input type='email' name='email' placeholder="email" />
        <input type='password' name='password' placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
