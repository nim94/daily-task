import React, { Component } from 'react';
// import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
// import { Mutation } from 'react-apollo'
// import gql  from 'graphql-tag'
// import Task from '../components/Task'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'
// import withApollo from '../lib/withApollo'
import TaskList from '../components/TaskList'
// import url from 'url'



class tasklist extends Component {
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
               <TaskList /> 
            </div>
        )
    }
}

// const mapDispatchToProps = dispatch => { return { dateRange: bindActionCreators( dateRange, dispatch ) } }

export default tasklist;