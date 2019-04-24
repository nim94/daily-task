import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { graphql, Mutation } from 'react-apollo'
import gql  from 'graphql-tag'
import TaskList from '../components/TaskList'
import withApollo from '../lib/withApollo'

class tasklist extends Component {

    static getInitialProps ({ store }) {
        store.dispatch(dateRange())
    }

    constructor(props){
        super(props)
        const attributes = {
            begin: this.props.dateRange()[0],
            end: this.props.dateRange()[1],
        }
    }

    render(){
        return(
            <div>
                <TaskList />
            </div>
        )
    }
}

const TASK_LIST = gql`
  query getTaskList($name: String!, $begin: String!, $end: String!) {
    getTaskList(name: $name, begin: $begin, end: $end) {
        taskList
    }
  }
`

const mapDispatchToProps = dispatch => { return { dateRange: bindActionCreators( dateRange, dispatch ) } }

export default withApollo( connect( null, mapDispatchToProps )( tasklist ) );