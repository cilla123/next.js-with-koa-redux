import React, { Component } from 'react';
import Link from 'next/link';

class Header extends Component {
  render () {
    return (
      <div>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
      </div>
    );
  }
}

export default Header;
