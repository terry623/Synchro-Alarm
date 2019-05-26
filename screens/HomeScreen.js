import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Icon,
  Card,
  Button,
  Input,
  ListItem,
  ButtonGroup,
} from 'react-native-elements';
import { connect } from 'react-redux';

import color from '../constants/Colors';
import TimePicker from '../components/TimePicker';
import Alarm from '../components/Alarm';

const buttons = [
  { name: '二進位', type: 'binary' },
  { name: '方程式', type: 'equation' },
  { name: '拼句子', type: 'words' },
];

class HomeScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    isInviting: false,
    date: '',
    // FIXME: 測試帳號
    text: 'terry623',
    isAlarmVisible: false,
    selectedIndex: 0,
  };

  static navigationOptions = {
    header: null,
  };

  setAlarmDate = date => {
    this.setState({ date });
    console.log('A date has been picked: ', date);
  };

  sendInvitation = () => {
    const { socket, userName } = this.props;
    const { date, text, selectedIndex } = this.state;

    const currentTime = new Date();
    const differenceInTime = date.getTime() - currentTime.getTime();

    socket.emit(
      'matchingRequest',
      userName,
      text,
      buttons[selectedIndex].type,
      differenceInTime
    );
  };

  callAlarm = () => {
    this.setState({ isAlarmVisible: true });
  };

  closeAlarm = () => {
    this.setState({ isAlarmVisible: false });
  };

  render() {
    const {
      alarmDetail: { friend },
    } = this.props;
    const {
      isDateTimePickerVisible,
      isAlarmVisible,
      isInviting,
      date,
      text,
      selectedIndex,
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
                      onPress={() => this.setState({ isInviting: true })}
                    />
                  ) : (
                    <View>
                      <ButtonGroup
                        selectedButtonStyle={styles.selectButton}
                        onPress={selectedIndex =>
                          this.setState({ selectedIndex })
                        }
                        selectedIndex={selectedIndex}
                        buttons={buttons.map(button => button.name)}
                      />
                      <Input
                        placeholder="你朋友的帳號"
                        onChangeText={text => this.setState({ text })}
                        value={text}
                      />
                      <Button
                        containerStyle={styles.inviteButton}
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
                    <Button title="直接響" onPress={this.callAlarm} />
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
  selectButton: {
    backgroundColor: color.tabIconDefault,
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

export default connect(state => ({
  ...state.user,
  ...state.alarm,
}))(HomeScreen);
