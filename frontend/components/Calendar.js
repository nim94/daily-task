import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Calendar from 'react-calendar/dist/entry.nostyle'

class MyCalendar extends React.Component {
    state = {
      date: new Date(),
    }
   
    onChange = date => this.setState({ date })
   
    render() {
      return (
        <div>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      );
    }
  }

  export default MyCalendar;