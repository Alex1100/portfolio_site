import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { JobChatbot } from './components/JobChatbot';
import { SiteMenu } from './components/SiteMenu';
import { About } from './components/About';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'rgb(198, 229, 247, 0.5)';
  }

  render() {
    return (
      <Fragment>
        <SiteMenu />
        <About />
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
