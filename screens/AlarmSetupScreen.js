import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Input,
  ButtonGroup,
  Text,
  Icon,
  Header,
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';

import questionType from '../constants/QuestionType';
import color from '../constants/Colors';

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  selectButton: {
    backgroundColor: color.mainColor,
  },
  inviteButton: {
    marginTop: 15,
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
    const { socket, userName } = this.props;
    const { date, text, selectedIndex } = this.state;

    const currentTime = new Date();
    const differenceInTime = date.getTime() - currentTime.getTime();

    socket.emit(
      'matchingRequest',
      userName,
      text,
      questionType[selectedIndex].type,
      differenceInTime
    );

    this.initInput();
  };

  initInput = () => {
    this.setState({ date: '', text: '', selectedIndex: 0 });
  };

  render() {
    const { navigation } = this.props;
    const { isDateTimePickerVisible, date, text, selectedIndex } = this.state;

    return (
      <View>
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
        {date === '' ? (
          <Button
            title="設定時間"
            onPress={() => this.setState({ isDateTimePickerVisible: true })}
          />
        ) : (
          <Text>
            {date.getHours()} 時 {date.getMinutes()} 分
          </Text>
        )}
        <ButtonGroup
          selectedButtonStyle={styles.selectButton}
          onPress={s => this.setState({ selectedIndex: s })}
          selectedIndex={selectedIndex}
          buttons={questionType.map(button => button.name)}
        />
        <Input
          placeholder="請輸入你朋友的帳號"
          onChangeText={t => this.setState({ text: t })}
          value={text}
        />
        <Button
          containerStyle={styles.inviteButton}
          title="送出"
          onPress={this.sendInvitation}
        />
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
