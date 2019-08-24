import React, { useContext, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'

const Signup = ({ history }) => {
  const { dispatch } = useContext(TradeContext)

  const handleSignup = useCallback(e => {
    e.preventDefault()
    const { username, email, password } = e.target.elements
    try {
      firebase.auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(({ user }) => {
          dispatch({
            type: 'CREATE_NEW_USER_DATA',
            userId: user.uid,
            username: username.value
          })
        })
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }, [history])

  return (
    <div>
      <Nav />
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type='text' name='username' placeholder="username" />
        <input type='email' name='email' placeholder="email" />
        <input type='password' name='password' placeholder="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}


export default withRouter(Signup)
