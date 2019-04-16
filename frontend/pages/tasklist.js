import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { graphql, Mutation } from 'react-apollo'
import gql  from 'graphql-tag'
import TaskList from '../components/TaskList'

class tasklist extends Component {

    render(){
        return(
            <div>
                <TaskList />
            </div>
        )
    }
}

export default tasklist;