import React from 'react'
import Link from 'next/link'
/* import { connect } from 'react-redux' */
/* import { bindActionCreators } from 'redux' */
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import { UserId } from '../lib/store'
import SigninBox from '../components/signinBox'

export default class Signin extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser.user) {
      // get user id from store
      context.store.dispatch(UserId(loggedInUser.user.id));
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

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