import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { JobChatbot } from './components/JobChatbot';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <h1>Hello Portfolio Site.</h1>
        <JobChatbot />
      </Fragment>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="App" />,
    document.body.appendChild(document.createElement('div'))
  )
});
