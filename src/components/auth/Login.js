import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/firebase'


export default class Login extends Component {
  state = {
    email: '',
    password: '',
    foundUser: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault()
    const { email, password, foundUser } = this.state

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log('LOGIN USER', user, user.user.uid)
      this.setState({ foundUser : !foundUser })
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    const { foundUser } = this.state
    if(foundUser) return <Redirect to="/" />
    return (
      <>
        <form onSubmit={this.handleLogin}>
          <h2>Log In</h2>
          <input
            type='email'
            name='email'
            placeholder="email"
            onChange={this.handleChange}
            value={this.state.email}
            />
          <input
            type='password'
            name='password'
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
            />
          <button>Login</button>
        </form>
      </>
    )
  }
}
