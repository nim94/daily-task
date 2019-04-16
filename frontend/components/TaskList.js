import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class TaskList extends React.Component {
    getInitialProps = async (ctx) => { return { query } = ctx }
    state = {
      query
    } 
   
    render() {
      return (
        <div>
          {console.log(this.state.query)}
        </div>
      );
    }
  }

  export default TaskList;