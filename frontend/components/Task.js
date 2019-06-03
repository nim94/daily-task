import React from 'react'
// import { Mutation, withApollo } from 'react-apollo'
// import gql from 'graphql-tag'

class Task extends React.Component {

  constructor(props){
    super(props);
      userId: ''
      name: ''
      begin: ''
      end: ''
      steps: new Array()
      type: ''
      priority: 0
  }
   
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.begin}</div>
        <div>{this.props.end}</div>
        <div>{this.props.steps}</div>
      </div>
    );
  }
}

  export default Task;