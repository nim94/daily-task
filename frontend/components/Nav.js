import React, { Component } from 'react';
/* import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'; */
import Link from 'next/link';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/page"><a>Page</a></Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;