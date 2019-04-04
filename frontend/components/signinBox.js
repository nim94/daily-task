import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

const SIGN_IN = gql`
  mutation Login($email: String!, $password: String!) {
    Login(mail: $email, psw: $password ) {
      token
    }
  }
`

// TODO: Find a better name for component.
const SigninBox = ({ client }) => {
  let email, password

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        // Store the token in cookie
        document.cookie = cookie.serialize('token', data.Login.token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
        // Force a reload of all the current queries now that the user is
        // logged in
        client.cache.reset().then(() => {
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
                email: email.value,
                password: password.value
              }
            })

            email.value = password.value = ''
          }}
        >
          {error && <p>Issue occurred while logging</p>}
          <input
            name='email'
            placeholder='Email'
            ref={node => {
              email = node
            }}
          />
          <br />
          <input
            name='password'
            placeholder='Password'
            ref={node => {
              password = node
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

export default withApollo(SigninBox)