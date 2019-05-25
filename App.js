import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './states/store';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
