import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { connect } from 'react-redux';
import { Overlay, Text, Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import color from '../constants/Colors';
import {
  setSocket,
  setUserName,
  setLogin,
  addAlarm,
  openAlarm,
  setCurrentAlarm,
  appendMessage,
  removeAlarm,
} from '../states/actions';
import Account from './Account';
import HomeScreen from '../screens/HomeScreen';
import AlarmSetupScreen from '../screens/AlarmSetupScreen';
import SettingsScreen from '../screens/SettingsScreen';

const io = require('socket.io-client');

const SocketEndpoint = 'http://192.168.1.104:3000/';
// const SocketEndpoint = 'https://synchro-alarm-server.now.sh/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  refuseButton: {
    backgroundColor: color.errorBackground,
  },
  buttonContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  inviteBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteMessageBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inviteMessageBlockCorrect: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inviteMessage: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  inviteMessageCorrect: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  AlarmSetup: {
    screen: AlarmSetupScreen,
  },
  Setting: {
    screen: SettingsScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);

class Main extends Component {
  state = {
    isLoadingComplete: false,
    isAnswer: false,
    beInvited: false,
    friend: '',
    questionType: '',
    alarmTime: '',
    matchingId: '',
  };

  componentDidMount() {
    const {
      setSocket: setSocketFromProps,
      setUserName: setUserNameFromProps,
      setLogin: setLoginFromProps,
      openAlarm: openAlarmFromProps,
      setCurrentAlarm: setCurrentAlarmFromProps,
      addAlarm: addAlarmFromProps,
      appendMessage: appendMessageFromProps,
      removeAlarm: removeAlarmFromProps,
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

      if (!response.msg) {
        const { user1, questionType, alarmTime, matchingId } = response;
        this.setState({
          beInvited: true,
          friend: user1,
          questionType,
          alarmTime,
          matchingId,
        });
      }
    });

    socket.on('replyMatching', response => {
      console.log('replyMatching', response);
      const { payload } = response;

      if (payload) {
        addAlarmFromProps(payload.alarm);
      }
    });

    socket.on('ring', response => {
      console.log('ring', response);
      const {
        payload: { alarmId, question, friend },
      } = response;

      openAlarmFromProps(true);
      setCurrentAlarmFromProps({ alarmId, question, friend });
    });

    socket.on('chat', response => {
      console.log('chat', response);
      const { msg } = response;
      appendMessageFromProps(msg);
    });

    socket.on('answer', response => {
      console.log('answer', response);
      const { msg } = response;

      if (msg === 'success') {
        openAlarmFromProps(false);
        removeAlarmFromProps(response.alarmId);
        this.setState({ isAnswer: true });
      }
    });
  }

  replyMatch = isAgree => {
    const { socket, userName } = this.props;
    const { friend, matchingId } = this.state;

    socket.emit(
      'replyMatching',
      userName,
      friend,
      matchingId,
      isAgree.toString()
    );

    this.setState({ beInvited: false });
  };

  _loadResourcesAsync = async () =>
    Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { skipLoadingScreen } = this.props;
    const {
      isLoadingComplete,
      beInvited,
      isAnswer,
      friend,
      questionType,
      alarmTime,
    } = this.state;

    // FIXME: 有錯
    // const date = new Date((new Date().getTime() + alarmTime) * 1000);

    return !isLoadingComplete && !skipLoadingScreen ? (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    ) : (
      <View style={styles.container}>
        <Overlay height={200} isVisible={isAnswer}>
          <View style={styles.inviteBlock}>
            <View style={styles.inviteMessageBlockCorrect}>
              <Text style={styles.inviteMessageCorrect}>正確答案!</Text>
              <Button
                containerStyle={styles.buttonContainer}
                title="關閉"
                onPress={() => this.setState({ isAnswer: false })}
              />
            </View>
          </View>
        </Overlay>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer />
        <Account />
        <Overlay height={200} isVisible={beInvited}>
          <View style={styles.inviteBlock}>
            <View style={styles.inviteMessageBlock}>
              <Text style={styles.inviteMessage}>
                {friend} 邀請你一起設鬧鐘
              </Text>
              <Text style={styles.inviteMessage}>
                時間為 {alarmTime}，題目為 {questionType}
              </Text>
            </View>
            <View style={styles.buttonGroup}>
              <View style={{ width: '50%' }}>
                <Button
                  containerStyle={styles.buttonContainer}
                  buttonStyle={styles.refuseButton}
                  title="婉拒"
                  onPress={() => this.replyMatch(false)}
                />
              </View>
              <View style={{ width: '50%' }}>
                <Button
                  containerStyle={styles.buttonContainer}
                  title="接受"
                  onPress={() => this.replyMatch(true)}
                />
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

export default connect(
  state => ({
    ...state.alarm,
    ...state.user,
  }),
  {
    setSocket,
    setUserName,
    setLogin,
    addAlarm,
    openAlarm,
    setCurrentAlarm,
    appendMessage,
    removeAlarm,
  }
)(Main);
