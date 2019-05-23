import React, { Component, Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Card, Button, Input, ListItem } from 'react-native-elements';

import TimePicker from '../components/TimePicker';

export default class HomeScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    isInviting: false,
    date: '',
    friend: '',
    text: '',
  };

  static navigationOptions = {
    header: null,
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  openInvite = () => {
    this.setState({ isInviting: true });
  };

  closeInvite = () => {
    this.setState({ isInviting: false });
  };

  setAlarmDate = date => {
    this.setState({ date });
    console.log('A date has been picked: ', date);
  };

  sendInvitation = () => {
    // FIXME: 先為了測試
    this.setState({ friend: this.state.text });
    this.closeInvite();
  };

  renderClock = () => {
    const {
      isDateTimePickerVisible,
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
                  onPress={this.openInvite}
                />
              ) : (
                <Fragment>
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
                    onPress={this.sendInvitation}
                  />
                </Fragment>
              )
            ) : (
              <ListItem
                title={friend}
                leftAvatar={{
                  source: {
                    uri:
                      'https://semantic-ui.com/images/avatar/large/elliot.jpg',
                  },
                }}
              />
            )}
          </Card>
        </View>
      );
    } else {
      return (
        <View style={styles.createTimePickerContainer}>
          <TimePicker
            isDateTimePickerVisible={isDateTimePickerVisible}
            hideDateTimePicker={this.hideDateTimePicker}
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
