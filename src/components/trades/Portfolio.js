import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/firebase'

export default class Portfolio extends Component {
  // state = {
  //   userExists: false
  // }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     console.log('CHECK FOR USER:PORTFOLIO', user)
  //     if(user) {
  //       this.setState({ userExists: true })
  //     } else {
  //       this.setState({ userExists: false })
  //     }
  //   })
  // }

  render() {
    // const { userExists } = this.state
    // console.log('portfolio::> user exists', userExists);

    return (
      <div>
        portfolio
      </div>
    )
  }
}
