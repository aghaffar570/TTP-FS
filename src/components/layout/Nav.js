import React, { Component } from 'react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import firebase from '../../config/firebase'

export default class Nav extends Component {
  state = {
    userExists: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ userExists: true })
      } else {
        this.setState({ userExists: false })
      }
    })
  }

  render() {
    const { userExists } = this.state
    const links = userExists ? < SignedIn/> : < SignedOut/>

    return (
      <div>
        {links}
      </div>
    )
  }
}

