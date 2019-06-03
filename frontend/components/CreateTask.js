import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import cookie from 'cookie'
// import redirect from '../lib/redirect'

const CREATE_TASK = gql`
mutation createTask(
    $userId: String!,
    $name: String!,
    $begin: Int,
    $end: Int,
    $steps: [Step],
    $type: TaskType,
    $priority: Int
){
    createTask(
        userId: $userId,
        name: $name,
        begin: $begin,
        end: $end,
        steps: $steps,
        type: $type,
        priority: $priority
    ){
        Task
    }
}
`

const CreateTask = ({ client }) => {
  let name, begin, end, steps, type, priority
  let userId = cookie.parse(document.cookie.token)

  return (
    <Mutation
      mutation={CREATE_TASK}
      onCompleted={data => {
        
      }}
      onError={error => console.log(error)}
    >
      {(createTask, { data, error }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            createTask({
              variables: {
                userId,
                name: name.value,
                begin: begin.value,
                end: end.value,
                // steps: steps.value,
                type: type.value,
                priority: priority.value
              }
            })
            name.value = email.value = password.value = ''
          }}
        >
          {error && <p>Issue occurred while creating Task </p>}
          <input
            name='name'
            placeholder='Name'
            ref={node => {
              name = node
            }}
          />
          <br />
          <input
            name='begin'
            placeholder='Task begin time'
            ref={node => {
              begin = node
            }}
            type="number"
          />
          <br />
          <input
            name='end'
            placeholder='Task end time'
            ref={node => {
              end = node
            }}
            type='number'
          />
          <br />
          {/* <input
            name='steps'
            placeholder='Task steps'
            ref={node => {
              steps = node
            }}
            type='number'
          />
          <br /> */}
          <select>
              <option>-- Task type</option>
              <option value="SPECIAL">SPECIAL</option>
              <option value="BASE">BASE</option>
              <option value="DATE_TO_DATE">DATE_TO_DATE</option>
              <option value="DAILY">DAILY</option>
              <option value="FERIAL">FERIAL</option>
              <option value="WEEKLY">WEEKLY</option>
          </select>
          <input
            name='priority'
            placeholder='Task priority'
            ref={node => {
              priority = node
            }}
            type='number'
          />
          <br />
          <button type='submit'>Create Task</button>
        </form>
      )}
    </Mutation>
  )
}

export default withApollo(CreateTask)