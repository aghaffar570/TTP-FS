import React, { useContext, useCallback } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { AuthContext } from '../providers/AuthContext'
import firebase from '../../config/firebase'
import Nav from '../layouts/Nav'

const Login = ({ history }) => {

  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const handleLogin = useCallback(async e => {
    e.preventDefault()
    const { email, password } = e.target.elements
    try {
      const user = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      console.log('login user>>', user);

      /**
       * get user info once logged in
       * update state for tradeContext
       */
      // firebase.firestore()
      //   .collection('trades').doc()
      //   .then(documentSnapshot => {
      //     if (documentSnapshot.exists) {
      //       // do something with the data
      //     } else {
      //       console.log('document not found');
      //     }
      //     console.log('DATA BACK', documentSnapshot.data());
      //   })

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
