import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { connect } from 'react-redux';
import { Overlay, Text, Button } from 'react-native-elements';
const io = require('socket.io-client');

import color from './constants/Colors';

import {
  setSocket,
  setUserName,
  setLogin,
  setAlarmDetail,
} from './states/actions';
import AppNavigator from './navigation/AppNavigator';
import Account from './components/Account';
import { websocket } from './constants/Warning';
YellowBox.ignoreWarnings([websocket]);

const SocketEndpoint = 'http://192.168.1.107:3000';

class Main extends Component {
  state = {
    isLoadingComplete: false,
    beInvited: false,
    alarmDetail: {
      friend: '',
      questionType: '',
      alarmTime: '',
      matchingId: '',
    },
  };

  componentDidMount() {
    const {
      setSocket: setSocketFromProps,
      setUserName: setUserNameFromProps,
      setLogin: setLoginFromProps,
    } = this.props;

    const socket = io(SocketEndpoint, {
      transports: ['websocket'],
    });

    setSocketFromProps(socket);

    socket.on('register', response => {
      console.log('register', response);
      const { msg, payload } = response;
      if (!payload) {
        console.log(msg);
      } else {
        setUserNameFromProps(payload.userName);
        setLoginFromProps(true);
      }
    });

    socket.on('logIn', response => {
      console.log('logIn', response);
      const { msg, payload } = response;
      if (!payload) {
        console.log(msg);
      } else {
        setUserNameFromProps(payload.userName);
        setLoginFromProps(true);
      }
    });

    socket.on('matchingRequest', response => {
      console.log('matchingRequest', response);
      if (typeof response === 'object') {
        const { user1, questionType, alarmTime, matchingId } = response;
        this.setState({
          beInvited: true,
          alarmDetail: { friend: user1, questionType, alarmTime, matchingId },
        });
      }
    });

    socket.on('replyMatching', response => {
      console.log('replyMatching', response);
    });
  }

  replyMatch = isAgree => {
    const { setAlarmDetail: setAlarmDetailFromProps } = this.props;
    const { alarmDetail } = this.state;

    // FIXME: 要使用 replyMatching 回應
    if (isAgree) {
      this.setState({ beInvited: false });
      setAlarmDetailFromProps(alarmDetail);
    } else {
      console.log('Refuse');
    }
  };

  render() {
    const { skipLoadingScreen } = this.props;
    const {
      isLoadingComplete,
      beInvited,
      alarmDetail: { friend, questionType, alarmTime },
    } = this.state;

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
        <Overlay height={200} isVisible={beInvited}>
          <View style={styles.inviteBlock}>
            <View style={styles.inviteMessageBlock}>
              <Text style={styles.inviteMessage}>{friend} 邀請你</Text>
              <Text style={styles.inviteMessage}>{alarmTime} 一同起床</Text>
            </View>
            <View style={styles.buttonGroup}>
              <Button
                containerStyle={styles.buttonContainer}
                title="同意"
                onPress={() => this.replyMatch(true)}
              />
              <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.refuseButton}
                title="拒絕"
                onPress={() => this.replyMatch(false)}
              />
            </View>
          </View>
        </Overlay>
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
  buttonGroup: {
    marginTop: 'auto',
  },

  refuseButton: {
    backgroundColor: color.tabIconDefault,
  },
  buttonContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  inviteBlock: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inviteMessageBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteMessage: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default connect(
  state => ({}),
  { setSocket, setUserName, setLogin, setAlarmDetail }
)(Main);
