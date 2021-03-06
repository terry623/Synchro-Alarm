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
    marginBottom: 20,
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
    marginTop: 80,
  },
  accountViewInput: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  status: {
    fontSize: 12,
    marginTop: 20,
  },
  link: {
    color: color.linkText,
  },
});

class Account extends Component {
  state = {
    toLoginPage: false,
    username: '',
    password: '',
    passwordAgain: '',
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.userNameBeUsed !== this.props.userNameBeUsed &&
      this.props.userNameBeUsed
    ) {
      this.setState({ requireMsg: '帳號已被使用' });
    }
  }

  signUpOrLogIn = () => {
    const { toLoginPage, username, password, passwordAgain } = this.state;
    const { socket } = this.props;
    if (username === '') {
      this.setState({ requireMsg: '請填寫此欄位' });
      return;
    }
    if (password === '') {
      this.setState({ requireMsg2: '請填寫此欄位' });
      return;
    }
    if (passwordAgain === '') {
      this.setState({ requireMsg3: '請填寫此欄位' });
      return;
    }
    if (password !== passwordAgain) return;

    toLoginPage
      ? socket.emit('logIn', username, password)
      : socket.emit('register', username, password);
  };

  render() {
    const {
      toLoginPage,
      username,
      password,
      passwordAgain,
      requireMsg,
      requireMsg2,
      requireMsg3,
    } = this.state;
    const { isLogin, userNameBeUsed } = this.props;

    return (
      <Overlay
        fullScreen
        isVisible={!isLogin}
        containerStyle={styles.container}
      >
        <View style={styles.view}>
          <View style={styles.accountView}>
            <Text style={styles.title}>
              {toLoginPage ? '登入帳號' : '註冊帳號'}
            </Text>
            <View style={styles.accountViewInput}>
              <Input
                placeholder="Username"
                onChangeText={u => this.setState({ username: u })}
                value={username}
                leftIconContainerStyle={styles.leftIcon}
                containerStyle={styles.childContainer}
                errorStyle={{ color: 'red' }}
                errorMessage={
                  requireMsg && (username === '' || userNameBeUsed)
                    ? requireMsg
                    : ''
                }
                leftIcon={<Icon name="user" type="antdesign" size={24} />}
              />
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={p => this.setState({ password: p })}
                value={password}
                leftIconContainerStyle={styles.leftIcon}
                containerStyle={styles.childContainer}
                errorStyle={{ color: 'red' }}
                errorMessage={requireMsg2 && password === '' ? requireMsg2 : ''}
                leftIcon={<Icon name="lock1" type="antdesign" size={24} />}
              />
              {!toLoginPage ? (
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={p => this.setState({ passwordAgain: p })}
                  value={passwordAgain}
                  leftIconContainerStyle={styles.leftIcon}
                  containerStyle={styles.childContainer}
                  errorStyle={{ color: 'red' }}
                  errorMessage={
                    (requireMsg3 || passwordAgain !== '') &&
                    password !== passwordAgain
                      ? '密碼不一致'
                      : ''
                  }
                  leftIcon={<Icon name="lock" type="antdesign" size={24} />}
                />
              ) : (
                <></>
              )}
            </View>
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
