import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';

import store from './states/store';
import Main from './components/Main';
import color from './constants/Colors';

console.disableYellowBox = true;

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
