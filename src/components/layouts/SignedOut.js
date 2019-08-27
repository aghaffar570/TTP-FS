import React from 'react'
import { Link } from 'react-router-dom'

const SignedOut = () => {
  return (
    <div className="links">
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign up</Link>
    </div>
  )
}

export default SignedOut
