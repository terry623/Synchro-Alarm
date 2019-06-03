import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import color from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    height: '100%',
  },
  buttonContainer: {
    marginTop: 30,
    width: 120,
  },
  childContainer: {
    marginTop: 30,
    width: '80%',
  },
  leftIcon: {
    marginRight: 10,
  },
  accountView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
  },
  status: {
    fontSize: 12,
    marginTop: 20,
  },
  link: {
    color: color.tintColor,
  },
});

class Account extends Component {
  state = {
    toLoginPage: false,
    username: '',
    password: '',
  };

  signUpOrLogIn = () => {
    const { toLoginPage, username, password } = this.state;
    const { socket } = this.props;

    toLoginPage
      ? socket.emit('logIn', username, password)
      : socket.emit('register', username, password);
  };

  render() {
    const { toLoginPage, username, password } = this.state;
    const { isLogin } = this.props;

    return (
      <Overlay
        fullScreen
        isVisible={!isLogin}
        containerStyle={styles.container}
      >
        <View style={styles.view}>
          <View style={styles.accountView}>
            <Text style={styles.title}>
              {toLoginPage ? '會員登入' : '註冊會員'}
            </Text>
            <Input
              placeholder="Username"
              onChangeText={u => this.setState({ username: u })}
              value={username}
              leftIconContainerStyle={styles.leftIcon}
              containerStyle={styles.childContainer}
              leftIcon={<Icon name="user" type="antdesign" size={24} />}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={p => this.setState({ password: p })}
              value={password}
              leftIconContainerStyle={styles.leftIcon}
              containerStyle={styles.childContainer}
              leftIcon={<Icon name="lock1" type="antdesign" size={24} />}
            />
            <Button
              title="送出"
              raised
              onPress={this.signUpOrLogIn}
              containerStyle={styles.buttonContainer}
            />
            <View>
              {toLoginPage ? (
                <Text style={styles.status}>
                  還沒有帳號嗎？
                  <Text
                    style={[styles.status, styles.link]}
                    onPress={() => this.setState({ toLoginPage: false })}
                  >
                    註冊
                  </Text>
                </Text>
              ) : (
                <Text style={styles.status}>
                  已經有帳號了？
                  <Text
                    style={[styles.status, styles.link]}
                    onPress={() => this.setState({ toLoginPage: true })}
                  >
                    登入
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

export default connect(state => ({
  ...state.user,
}))(Account);
