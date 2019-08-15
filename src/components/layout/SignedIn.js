import React from 'react'
import { Link } from 'react-router-dom'

const SignedIn = () => {
  return (
    <div>
      <Link to='/portfolio'>Portfolio</Link>
      <Link to='/transactions'>Transactions</Link>
      <a href="">Log Out</a>
    </div>
  )
}

export default SignedIn
