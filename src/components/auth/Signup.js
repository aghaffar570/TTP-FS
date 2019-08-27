import React, { useContext, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { TradeContext } from '../providers/TradeContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'

const Signup = ({ history }) => {
  // const { dispatch } = useContext(TradeContext)

  const handleSignup = useCallback(e => {
    e.preventDefault()
    const { username, email, password } = e.target.elements
    try {
      firebase.auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(({ user }) => {
          firebase.firestore().collection('trades').doc(user.uid).set({
            username: username.value,
            trades: [],
            profits: 0,
            balance: 5000
          })
        })
      history.push('/portfolio')
    } catch (err) {
      console.error(err)
    }
  }, [history])

  return (
    <>
      <Nav />
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type='text' name='username' placeholder="username" />
          <input type='email' name='email' placeholder="email" />
          <input type='password' name='password' placeholder="password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}


export default withRouter(Signup)
