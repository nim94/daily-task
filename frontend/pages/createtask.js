import React, { Component } from 'react'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
// import { connect } from 'react-redux'
// import { UserId } from '../lib/store'
// import { Mutation, withApollo } from 'react-apollo'
// import gql from 'graphql-tag'
import CreateTask from '../components/CreateTask'



class createTask extends Component {
    static async getInitialProps (context) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    
        if (!loggedInUser.user) {
          // get user id from store
          // context.store.dispatch(UserId(loggedInUser.user.id));
          
          // Already signed in? No need to continue.
          // Throw them back to the main page
          redirect(context, '/signin')
        }
    
        return {}
    }

    render(){
        return(
            <div>
                <CreateTask />
            </div> 
        )
    }

}

export default createTask