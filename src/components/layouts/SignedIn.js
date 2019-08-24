import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'

const SignedIn = () => {
  return (
    <div>
      <Link to='/portfolio'>Portfolio</Link>
      <Link to='/transactions'>Transactions</Link>
      <a onClick={() => firebase.auth().signOut()}>Log Out</a>
    </div>
  )
}

export default SignedIn
