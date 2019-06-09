import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Input,
  ButtonGroup,
  Icon,
  Header,
  Text,
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';

import questionType from '../constants/QuestionType';
import questionDescription from '../constants/QuestionDescription';
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
  questionDescription: {
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

class AlarmSetupScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isDateTimePickerVisible: false,
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

  sendInvitation = () => {
    const { socket, userName, navigation } = this.props;
    const { date, text, selectedIndex } = this.state;
    if (date === '' || text === '') return;

    const currentTime = new Date();
    const differenceInTime = date.getTime() - currentTime.getTime();

    socket.emit(
      'matchingRequest',
      userName,
      text,
      questionType[selectedIndex].type,
      differenceInTime,
      date
    );

    navigation.navigate('Home');
  };

  render() {
    const { navigation } = this.props;
    const { isDateTimePickerVisible, date, text, selectedIndex } = this.state;

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
            text: 'Set Alarm',
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
          <View style={styles.questionDescription}>
            <Text>{questionDescription[selectedIndex][0]}</Text>
            <Text>{questionDescription[selectedIndex][1]}</Text>
            <Text>{questionDescription[selectedIndex][2]}</Text>
          </View>
          <Input
            placeholder="請輸入你朋友的帳號"
            onChangeText={t => this.setState({ text: t })}
            value={text}
          />
          <Button
            containerStyle={styles.inviteButtonContainer}
            buttonStyle={styles.inviteButton}
            title="送出"
            onPress={this.sendInvitation}
          />
        </View>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          mode="time"
          onConfirm={this.addAlarm}
          onCancel={() => this.setState({ isDateTimePickerVisible: false })}
        />
      </View>
    );
  }
}

export default connect(state => ({
  ...state.user,
}))(AlarmSetupScreen);
