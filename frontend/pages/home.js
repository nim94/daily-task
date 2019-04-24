import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { graphql, Mutation } from 'react-apollo'
import gql  from 'graphql-tag'
import MyCalendar from '../components/Calendar'
import { dateRange } from '../lib/store';
import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.4.3/node_modules/redux';
import withApollo from 'next-with-apollo';

class Home extends Component {    

    render(){
        return(
            <div>
                <MyCalendar />
            </div>
        )
    }
}

export default Home;