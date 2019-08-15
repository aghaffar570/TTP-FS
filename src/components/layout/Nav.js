import React from 'react';
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'

const Nav = () => {
  // check if user exists

  return (
    <div>
      < SignedIn/>
      < SignedOut/>
    </div>
  );
}

export default Nav;
