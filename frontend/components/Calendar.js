import React from 'react'
import ReactDOM from 'react-dom'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Calendar from 'react-calendar/dist/entry.nostyle'
import Link from 'next/link'
import $ from 'jquery'
/* import Calendar from 'react-calendar' */

class MyCalendar extends React.Component {
    state = {
      date: new Date(),
    }
   
    onChange = date => this.setState({ date })

    componentDidMount(){
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
          let children = node.querySelectorAll('button.react-calendar__tile');
          let activeChildren = node.querySelectorAll('button.react-calendar__tile--active');
          children.forEach(el => {
            el.setAttribute('style', el.getAttribute('style') + ' background: lightgray;')  
          })
          activeChildren.forEach(el => {
            el.setAttribute('style', el.getAttribute('style') + ' background: blue;')  
          })
        }
    }
    
    componentDidUpdate(){
      const node = ReactDOM.findDOMNode(this);
      if (node instanceof HTMLElement) {
        let activeChildren = node.querySelectorAll('button.react-calendar__tile--active');
        let children = node.querySelectorAll('button.react-calendar__tile:not(.react-calendar__tile--active)');
        children.forEach(el => {
          el.setAttribute('style', el.getAttribute('style') + ' background: lightgray;')
        });
        activeChildren.forEach(el => {
          el.setAttribute('style', el.getAttribute('style') + ' background: blue;')
        });
      }
    }
   
    render() {
      return (
        <div>
          <Calendar
            locale={'en-US'}
            onChange={this.onChange}
            value={this.state.date}
            selectRange={true}
          />  
          {/* <Link href={{ pathname: '/tasklist', query: { date: this.state.date } }} /> */}
        </div>
      );
    }
  }

  export default MyCalendar;