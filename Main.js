import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { connect } from 'react-redux';
const io = require('socket.io-client');

import { setSocket } from './states/actions';
import AppNavigator from './navigation/AppNavigator';
import Account from './components/Account';
import { websocket } from './constants/Warning';
YellowBox.ignoreWarnings([websocket]);

const SocketEndpoint = 'http://192.168.1.107:3000';

class Main extends Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    const { setSocket: setSocketFromProps } = this.props;

    const socket = io(SocketEndpoint, {
      transports: ['websocket'],
    });

    socket.on('register', msg => {
      console.log('register', msg);
    });

    socket.on('logIn', msg => {
      console.log('logIn', msg);
    });

    setSocketFromProps(socket);
  }

  render() {
    const { skipLoadingScreen } = this.props;
    const { isLoadingComplete } = this.state;

    return !isLoadingComplete && !skipLoadingScreen ? (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    ) : (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        <Account />
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default connect(
  state => ({}),
  { setSocket }
)(Main);
