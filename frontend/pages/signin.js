import React from 'react'
import Link from 'next/link'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
// import { UserId } from '../lib/store'
import SigninBox from '../components/signinBox'
import cookie from 'cookie'

export default class Signin extends React.Component {
  static async getInitialProps (context) {
    const { token } = context.token ? context : await cookie.parse(context.req ? context.req.headers.cookie || '' : '')
    const log = await checkLoggedIn(context.apolloClient, token)

    if(log) {
      if (log.loggedInUser.id) {
        // get user id from store
        // context.store.dispatch(UserId(loggedInUser.user.id));
        
        // Already signed in? No need to continue.
        // Throw them back to the main page
        redirect(context, '/')
      }
      else return {}
    }
    console.log('log non esiste: ' + log)
    return {}
  }

  render () {
    return (
      <React.Fragment>
        {/* SigninBox handles all login logic. */}
        <SigninBox />
        <hr />
        New?{' '}
        <Link prefetch href='/createAccount'>
          <a>Create account</a>
        </Link>
      </React.Fragment>
    )
  }
} 