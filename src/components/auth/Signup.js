import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/firebase'

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    createdUser: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSignUp = e => {
    e.preventDefault()
    const { username, email, password, createdUser } = this.state
    console.log('SIGN UP USER::>', this.state)
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        console.log(newUser)
        this.setState({ createdUser : !createdUser})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { createdUser } = this.state
    if(createdUser) return <Redirect to="/" />
    return (
      <>
        <form onSubmit={this.handleSignUp}>
          <h2>Sign Up</h2>
          <input
            type='text'
            name='username'
            placeholder="name"
            onChange={this.handleChange}
            value={this.state.username}
            />
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
          <button>Sign Up</button>
        </form>
      </>
    )
  }
}
