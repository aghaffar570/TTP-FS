import React from 'react'
import { Link } from 'react-router-dom'

const SignedOut = () => {
  return (
    <div>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default SignedOut
