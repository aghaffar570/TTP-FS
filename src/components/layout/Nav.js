import React, { Component } from 'react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import firebase from '../../config/firebase'

const Nav = ({ userExists }) => {
  const links = userExists ? < SignedIn/> : < SignedOut/>
  return (
    <div>
      {links}
    </div>
  )
}

export default Nav

