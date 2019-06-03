import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Card, Button, Input, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { openAlarm } from '../states/actions';
import color from '../constants/Colors';
import Alarm from '../components/Alarm';

const buttons = [
  { name: '二進位', type: 'binary' },
  { name: '方程式', type: 'equation' },
  { name: '拼句子', type: 'words' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectButton: {
    backgroundColor: color.tabIconDefault,
  },
  contentContainer: {
    paddingTop: 50,
  },
  alarmContainer: {
    alignItems: 'center',
  },
  alarmCard: {
    width: 300,
  },
  createTimePickerContainer: {
    alignItems: 'center',
    bottom: 10,
  },
  inviteButton: {
    marginTop: 15,
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isDateTimePickerVisible: false,
    isInviting: false,
    date: '',
    text: '',
    selectedIndex: 0,
  };

  addAlarm = date => {
    console.log('A date has been picked: ', date);
    this.setState({
      date,
      isDateTimePickerVisible: false,
    });
  };

  initInput = () => {
    this.setState({ date: '', text: '', selectedIndex: 0 });
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

    this.initInput();
  };

  renderAllAlarmsFromStore = alarms =>
    alarms.map(alarm => (
      <Card
        key={alarm.alarmId}
        containerStyle={styles.alarmCard}
        title={alarm.alarmId}
      />
    ));

  render() {
    const { alarms } = this.props;
    const {
      isDateTimePickerVisible,
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
          <View style={styles.alarmContainer}>
            {this.renderAllAlarmsFromStore(alarms)}
            {date ? (
              <Card
                containerStyle={styles.alarmCard}
                title={`${date.getHours()} 時 ${date.getMinutes()} 分`}
              >
                {!isInviting ? (
                  <Button
                    title="邀請"
                    onPress={() => this.setState({ isInviting: true })}
                  />
                ) : (
                  <View>
                    <ButtonGroup
                      selectedButtonStyle={styles.selectButton}
                      onPress={s => this.setState({ selectedIndex: s })}
                      selectedIndex={selectedIndex}
                      buttons={buttons.map(button => button.name)}
                    />
                    <Input
                      placeholder="你朋友的帳號"
                      onChangeText={t => this.setState({ text: t })}
                      value={text}
                    />
                    <Button
                      containerStyle={styles.inviteButton}
                      title="送出"
                      onPress={this.sendInvitation}
                    />
                  </View>
                )}
              </Card>
            ) : (
              <></>
            )}
          </View>
          <Alarm />
        </ScrollView>
        <View style={styles.createTimePickerContainer}>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            mode="time"
            onConfirm={this.addAlarm}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          />
          <Icon
            reverse
            name="ios-add"
            type="ionicon"
            color={color.buttonColor}
            onPress={() => this.setState({ isDateTimePickerVisible: true })}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    ...state.user,
    ...state.alarm,
  }),
  { openAlarm }
)(HomeScreen);
