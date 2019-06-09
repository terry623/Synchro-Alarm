import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonGroup, Icon, Header } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';

import questionType from '../constants/QuestionType';
import color from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setupOption: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 280,
  },
  header: {
    height: 80,
  },
  selectButton: {
    backgroundColor: color.mainColor,
  },
  inviteButton: {
    backgroundColor: color.mainColor,
  },
  inviteButtonContainer: {
    marginTop: 15,
    width: '40%',
  },
  setUpButton: {
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  setUpTitleButton: {
    color: color.mainColor,
  },
});

class AlarmEditScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isDateTimePickerVisible: false,
    initDate: '',
    date: '',
    selectedIndex: 0,
  };

  componentDidMount() {
    const { alarms, navigation } = this.props;
    const alarmId = navigation.getParam('alarmId', '');
    const alarm = alarms.find(a => a.alarmId === alarmId);
    const questionTypeIndex = questionType.findIndex(
      q => q.type === alarm.questionType
    );
    const initDate = new Date(alarm.originTime);
    this.setState({
      initDate,
      date: initDate,
      selectedIndex: questionTypeIndex,
      alarmId,
    });
  }

  editAlarmTime = date => {
    console.log('A date has been picked: ', date);
    this.setState({
      date,
      isDateTimePickerVisible: false,
    });
  };

  editAlarm = () => {
    const { socket, navigation } = this.props;
    const { date, selectedIndex, alarmId } = this.state;
    const currentTime = new Date();
    const differenceInTime = date.getTime() - currentTime.getTime();
    socket.emit(
      'edit',
      alarmId,
      differenceInTime,
      date,
      questionType[selectedIndex].type
    );
    navigation.navigate('Home');
  };

  render() {
    const { navigation } = this.props;
    const {
      isDateTimePickerVisible,
      initDate,
      date,
      selectedIndex,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          backgroundColor={color.mainColor}
          leftComponent={
            <Icon
              name="chevron-left"
              type="material"
              color="#fff"
              size={32}
              underlayColor="transparent"
              onPress={() => navigation.navigate('Home')}
            />
          }
          centerComponent={{
            text: 'Edit Alarm',
            style: { color: '#fff', fontSize: 21 },
          }}
        />
        <View style={styles.setupOption}>
          <Button
            title={
              date === ''
                ? '設定時間'
                : `${date.getHours()} 時 ${date.getMinutes()} 分`
            }
            type="clear"
            buttonStyle={styles.setUpButton}
            titleStyle={styles.setUpTitleButton}
            onPress={() => this.setState({ isDateTimePickerVisible: true })}
          />
          <ButtonGroup
            selectedButtonStyle={styles.selectButton}
            onPress={s => this.setState({ selectedIndex: s })}
            selectedIndex={selectedIndex}
            buttons={questionType.map(button => button.name)}
          />
          <Button
            containerStyle={styles.inviteButtonContainer}
            buttonStyle={styles.inviteButton}
            title="送出"
            onPress={this.editAlarm}
          />
        </View>
        {initDate ? (
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            date={initDate}
            mode="time"
            onConfirm={this.editAlarmTime}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}

export default connect(state => ({
  ...state.user,
  ...state.alarm,
}))(AlarmEditScreen);
