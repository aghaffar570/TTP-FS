import React, { useContext } from 'react'
import { AuthContext } from "../providers/AuthContext";
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'

const Nav = () => {
  const { currentUser } = useContext(AuthContext)
  return currentUser ? < SignedIn/> : < SignedOut/>
}

export default Nav
