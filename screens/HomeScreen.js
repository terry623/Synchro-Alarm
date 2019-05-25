import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Card, Button, Input, ListItem } from 'react-native-elements';

import color from '../constants/Colors';

import TimePicker from '../components/TimePicker';
import Alarm from '../components/Alarm';

export default class HomeScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    isInviting: false,
    date: '',
    friend: '',
    // FIXME: 測試帳號
    text: 'terry623',
    isAlarmVisible: false,
  };

  static navigationOptions = {
    header: null,
  };

  setAlarmDate = date => {
    this.setState({ date });
    console.log('A date has been picked: ', date);
  };

  sendInvitation = () => {
    // FIXME: 為了測試
    this.setState({ friend: this.state.text, isInviting: false });
  };

  callAlarm = () => {
    console.log(this.state.isAlarmVisible);
    this.setState({ isAlarmVisible: true });
  };

  closeAlarm = () => {
    this.setState({ isAlarmVisible: false });
  };

  render() {
    const {
      isDateTimePickerVisible,
      isAlarmVisible,
      isInviting,
      date,
      friend,
      text,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {date ? (
            <View style={styles.alarmContainer}>
              <Card
                containerStyle={styles.alarmCard}
                title={`${date.getHours()} 時 ${date.getMinutes()} 分`}
              >
                {!friend ? (
                  !isInviting ? (
                    <Button
                      title="邀請"
                      buttonStyle={styles.button}
                      onPress={() => this.setState({ isInviting: true })}
                    />
                  ) : (
                    <View>
                      <Input
                        placeholder="你朋友的帳號"
                        onChangeText={text => this.setState({ text })}
                        value={text}
                      />
                      <Button
                        containerStyle={styles.inviteButton}
                        buttonStyle={styles.button}
                        title="送出"
                        onPress={this.sendInvitation}
                      />
                    </View>
                  )
                ) : (
                  <View>
                    <ListItem
                      title={friend}
                      leftAvatar={{
                        source: {
                          uri:
                            'https://semantic-ui.com/images/avatar/large/elliot.jpg',
                        },
                      }}
                    />
                    <Button
                      title="直接響"
                      buttonStyle={styles.button}
                      onPress={this.callAlarm}
                    />
                  </View>
                )}
                <Alarm
                  isAlarmVisible={isAlarmVisible}
                  friend={friend}
                  closeAlarm={this.closeAlarm}
                />
              </Card>
            </View>
          ) : (
            <View style={styles.createTimePickerContainer}>
              <TimePicker
                isDateTimePickerVisible={isDateTimePickerVisible}
                hideDateTimePicker={() =>
                  this.setState({ isDateTimePickerVisible: false })
                }
                setAlarmDate={this.setAlarmDate}
              />
              <Icon
                reverse
                name="ios-add"
                type="ionicon"
                color={color.buttonColor}
                onPress={() => this.setState({ isDateTimePickerVisible: true })}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: color.tintColor,
  },
  contentContainer: {
    paddingTop: 150,
  },
  alarmContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  alarmCard: {
    width: 300,
  },
  createTimePickerContainer: {
    alignItems: 'center',
  },
  inviteButton: {
    marginTop: 15,
  },
});
