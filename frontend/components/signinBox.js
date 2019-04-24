import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'
import { connect } from 'react-redux'
import { UserId } from '../lib/store'

const SIGN_IN = gql`
  mutation Login($name: String, $email: String, $password: String!) {
    Login(name: $name, mail: $email, psw: $password ) {
      token
      id
    }
  }
`

class SigninBox extends React.Component {
  constructor(props) {
    super(props)
    this.email = React.createRef()
    this.password = React.createRef()
  }

  render() {
    return (
      <Mutation
        mutation={SIGN_IN}
        onCompleted={data => {
          // put user id into store
          this.props.UserId(data.Login.id);
          // Store the token in cookie
          document.cookie = cookie.serialize('token', data.Login.token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
          // Force a reload of all the current queries now that the user is
          // logged in
          this.props.client.cache.reset().then(() => {
            redirect({}, '/home')
          })
        }}
        onError={error => {
          console.log(error)
        }}
      >
        {(signinUser, { data, error }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              signinUser({
                variables: {
                  email: this.email.value,
                  password: this.password.value
                }
              })

              this.email.value = this.password.value = ''
            }}
          >
            {error && <p>Issue occurred while logging</p>}
            <input
              name='email'
              placeholder='Email'
              ref={node => {
                this.email = node
              }}
            />
            <br />
            <input
              name='password'
              placeholder='Password'
              ref={node => {
                this.password = node
              }}
              type='password'
            />
            <br />
            <button>Sign in</button>
          </form>
        )}
      </Mutation>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UserId: (id) => dispatch(UserId(id))
  }
}
export default withApollo(connect(null, mapDispatchToProps)(SigninBox))