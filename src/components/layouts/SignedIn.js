import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import firebase from '../../config/firebase'

const SignedIn = ({ history }) => {

  const signOut = e => {
    e.preventDefault()
    firebase.auth().signOut()
    history.push('/login')
  }

  return (
    <div className="links">
      <Link to='/portfolio'>Portfolio</Link>
      <Link to='/transactions'>Transactions</Link>
      <a style={{cursor: 'pointer'}} onClick={signOut}>Log Out</a>
    </div>
  )
}

export default withRouter(SignedIn)
