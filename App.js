import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, Button } from 'react-native-elements';

import store from './states/store';
import Main from './Main';
import color from './constants/Colors';

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: color.tintColor,
    },
  },
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    );
  }
}
