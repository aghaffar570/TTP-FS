import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from '../../config/firebase'

export default class SignedIn extends Component {
  state = {
    signOut: false
  }

  handleSignOut = e => {
    e.preventDefault()
    const { signOut } = this.state
    firebase.auth().signOut()
    this.setState({ signOut : !signOut })
  }

  render() {
    const { signOut } = this.state
    if(signOut) return <Redirect to='/login' />
    return (
      <div>
        <Link to='/portfolio'>Portfolio</Link>
        <Link to='/transactions'>Transactions</Link>
        <a onClick={this.handleSignOut}>Log Out</a>
      </div>
    )
  }
}
