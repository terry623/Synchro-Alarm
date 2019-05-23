import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Card, Button, Input, ListItem } from 'react-native-elements';

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

  closeAlarm = () => {
    this.setState({ isAlarmVisible: false });
  };

  renderClock = () => {
    const {
      isDateTimePickerVisible,
      isAlarmVisible,
      isInviting,
      date,
      friend,
      text,
    } = this.state;

    if (date) {
      return (
        <View style={styles.alarmContainer}>
          <Card
            containerStyle={styles.alarmCard}
            title={`${date.getHours()} 時 ${date.getMinutes()} 分`}
          >
            {!friend ? (
              !isInviting ? (
                <Button
                  backgroundColor="#03A9F4"
                  title="邀請"
                  onPress={() => this.setState({ isInviting: true })}
                />
              ) : (
                <View>
                  <Input
                    placeholder="你朋友的帳號"
                    shake
                    onChangeText={text => this.setState({ text })}
                    value={text}
                  />
                  <Button
                    backgroundColor="#03A9F4"
                    style={styles.inviteButton}
                    title="送出"
                    onPress={() => this.setState({ isAlarmVisible: true })}
                  />
                  <Alarm
                    isAlarmVisible={isAlarmVisible}
                    friend={friend}
                    closeAlarm={this.closeAlarm}
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
                  backgroundColor="#03A9F4"
                  title="直接響"
                  onPress={this.callAlarm}
                />
              </View>
            )}
          </Card>
        </View>
      );
    } else {
      return (
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
            color="#f50"
            onPress={() => this.setState({ isDateTimePickerVisible: true })}
          />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {this.renderClock()}
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
