import React, { useContext, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'

const Signup = ({ history }) => {

  const { currentUser } = useContext(AuthContext)

  const handleSignup = useCallback(async e => {
    e.preventDefault()
    const { username, email, password } = e.target.elements
    try {
      const userCreated = firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      console.log('usercreated', userCreated)

      /**
       * NEW USERS COLLECTION
       * id: user.uid
       * username: username
       * trades: []
       * balance: 5000
       */
      // firebase.firestore().collection('trades').doc()
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
