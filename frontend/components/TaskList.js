import React, { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
// import cookie from 'cookie'
// import redirect from '../lib/redirect'
// import url from 'url'
import { UserId } from '../lib/store'
import Task from '../components/Task'
import { connect } from 'react-redux'

const GET_TASK_LIST = gql`
  mutation getTaskList( $begin: Int!, $end: Int!, $userId: ID! ) {
    getTaskList( begin: $begin, end: $end, userId: $userId ) {
        taskList
    }
  }
`

class TaskList extends Component {

    render(){
            return (
            <Mutation
                mutation={GET_TASK_LIST}
                onError={error =>console.log(error)}
            >
                {(getTaskList, { data, error }) => (
                    <div onLoad={() =>
                        getTaskList({
                        variables: {
                            begin: this.props.begin,
                            end: this.props.end,
                            userId: this.props.userid,
                        }
                    })}
                    >
                        {error && <p>Issue while recovering tasks</p>}
                        {data && data.array.forEach(element => {
                            <Task 
                            userId={element.userId}
                            name={element.name}
                            begin={element.begin}
                            end={element.end}
                            steps={element.steps}
                            type={element.type}
                            priority={element.priority} 
                            />
                        })}
                    </div>
                )}
            </Mutation>
        )
    }
}

const mapStateToProps = store => {
    return {
        userid: store.UserId,
        begin: store.dateBegin,
        end: store.dateEnd,
    }
}

export default withApollo(connect(mapStateToProps, null)(TaskList))