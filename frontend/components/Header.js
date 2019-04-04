import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import Nav from "./Nav";

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onRouteChangeError = () => {
  NProgress.done();
}

class Header extends Component {
  static async getInitialProps (ctx) {
    
  }

  render(){ return null }
}

export default Header;