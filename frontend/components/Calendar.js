import React from 'react'
import ReactDOM from 'react-dom'
import { /* Mutation, */ withApollo } from 'react-apollo'
// import gql from 'graphql-tag'
import Calendar from 'react-calendar/dist/entry.nostyle'
import Link from 'next/link'
// import $ from 'jquery'
import { /* UserId, */ dateRange } from '../lib/store'
import { connect } from 'react-redux'

class MyCalendar extends React.Component {
   
    onChange = () => {
      const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
          let firstOfRange = node.querySelector('button.react-calendar__tile--rangeStart')
          .firstElementChild
          .getAttribute('aria-label')
          let lastOfRange = node.querySelector('button.react-calendar__tile--rangeEnd')
          .firstElementChild
          .getAttribute('aria-label')
          this.props.dateRange(firstOfRange, lastOfRange)
        }
    }

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
            selectRange={true}
          />  
          <Link href="/tasklist"> 
            <a>
              Lista Tasks 
            </a>
          </Link>
          <Link href="/createtask">
            <a>
              Crea Task
            </a>
          </Link>
        </div>
      );
    }
  }

  // const mapStateToProps = store => {
  //   return {
  //     UserId: store.UserId,
  //     dateRange: {
  //       begin: store.dateRange.dateBegin,
  //       end: store.dateRange.dateEnd,
  //     },
  //   }
  // }
  
  const mapDispatchToProps = dispatch => {
      return {
          dateRange: (begin, end) => dispatch(dateRange(begin, end))
      }
  }
  
  export default withApollo(connect(null, mapDispatchToProps)(MyCalendar))
