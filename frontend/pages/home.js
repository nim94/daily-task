import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { graphql, Mutation } from 'react-apollo'
import gql  from 'graphql-tag'
import MyCalendar from '../components/Calendar'

class Home extends Component {

    render(){
        return(
            <MyCalendar />
        )
    }
}

export default Home;