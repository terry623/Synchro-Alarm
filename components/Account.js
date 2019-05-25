import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Input, Icon, Button } from 'react-native-elements';

import color from '../constants/Colors';

export default class Account extends Component {
  state = {
    isAccountVisible: true,
    toLogin: true,
    username: '',
    password: '',
  };

  signUp = () => {
    const { username, password } = this.state;
    console.log({ username, password });
  };

  logIn = () => {
    const { username, password } = this.state;
    console.log({ username, password });
  };

  render() {
    const { isAccountVisible, toLogin, username, password } = this.state;

    return (
      <Overlay
        fullScreen
        isVisible={isAccountVisible}
        containerStyle={styles.container}
      >
        <View style={styles.view}>
          <View style={styles.accountView}>
            <Text style={styles.title}>
              {toLogin ? '會員登入' : '註冊會員'}
            </Text>
            <Input
              placeholder="Username"
              onChangeText={username => this.setState({ username })}
              value={username}
              leftIconContainerStyle={styles.leftIcon}
              containerStyle={styles.childContainer}
              leftIcon={<Icon name="user" type="antdesign" size={24} />}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={password}
              leftIconContainerStyle={styles.leftIcon}
              containerStyle={styles.childContainer}
              leftIcon={<Icon name="lock1" type="antdesign" size={24} />}
            />
            <Button
              title="送出"
              raised
              onPress={toLogin ? this.logIn : this.signUp}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />
            <View>
              {toLogin ? (
                <Text style={styles.status}>
                  還沒有帳號嗎？
                  <Text
                    style={[styles.status, styles.link]}
                    onPress={() => this.setState({ toLogin: false })}
                  >
                    註冊
                  </Text>
                </Text>
              ) : (
                <Text style={styles.status}>
                  已經有帳號了？
                  <Text
                    style={[styles.status, styles.link]}
                    onPress={() => this.setState({ toLogin: true })}
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
  button: {
    backgroundColor: color.tintColor,
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
