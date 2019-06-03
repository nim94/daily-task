import gql from 'graphql-tag'

export default (apolloClient, token ) => {
  if( token )
    apolloClient
      .query({
        query: gql`
          query getUserFromToken($token: String!) {
            getUserFromToken(token: $token) {
              id
              name
            }
          }
        `,
        variables: { token }
      })
      .then(({ data }) => {
        console.log('query succesfull')
        return { loggedInUser: data.getUserFromToken }
      })
      .catch(() => {
        // Fail gracefully
        console.log('problems during the query')
        return { loggedInUser: {} }
      })
  else { console.log('token non esiste') ; return { loggedInUser: {} }}
}