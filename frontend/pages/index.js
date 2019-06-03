import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { graphql, Mutation } from 'react-apollo'
import gql  from 'graphql-tag'
import MyCalendar from '../components/Calendar'
import redirect from '../lib/redirect'
// import { dateRange } from '../lib/store';
// import withApollo from 'next-with-apollo';
import checkLoggedIn from '../lib/checkLoggedIn'
import cookie from 'cookie'

class Home extends Component {
    static async getInitialProps (context) {
        if(context) console.log(context)
        console.log('ci passo')
        const { token } = context.token ? context : await cookie.parse(context.req ? context.req.headers.cookie || '' : '')
        const log = await checkLoggedIn(context.apolloClient, token)
    
        if(log) {
            if (!log.loggedInUser.id) {
            // get user id from store
            // context.store.dispatch(UserId(loggedInUser.user.id));
            
            // Already signed in? No need to continue.
            // Throw them back to the main page
            console.log('log esiste ma non id: ' + JSON.stringify(log))
            redirect(context, '/signin')
            }
            else return {}
        }
        else redirect(context, '/signin') 
        return {}
    }

    render(){
        return(
            <div>
                <MyCalendar />
            </div>
        )
    }
}

export default Home;