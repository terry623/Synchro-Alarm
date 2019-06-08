import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Icon,
  Card,
  Button,
  Input,
  ButtonGroup,
  Header,
} from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { openAlarm } from '../states/actions';
import color from '../constants/Colors';
import questionType from '../constants/QuestionType';
import Alarm from '../components/Alarm';

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
  inviteButton: {
    marginTop: 15,
  },
  header: {
    height: 80,
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
      questionType[selectedIndex].type,
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
    const { alarms, navigation } = this.props;
    const {
      isDateTimePickerVisible,
      isInviting,
      date,
      text,
      selectedIndex,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          backgroundColor={color.mainColor}
          leftComponent={
            <Icon
              name="settings"
              type="material"
              color="#fff"
              size={28}
              underlayColor="transparent"
              onPress={() => navigation.navigate('Setting')}
            />
          }
          centerComponent={{
            text: 'Synchro Alarm',
            style: { color: '#fff', fontSize: 21 },
          }}
          rightComponent={
            <Icon
              name="add"
              type="material"
              color="#fff"
              size={32}
              underlayColor="transparent"
              onPress={() => this.setState({ isDateTimePickerVisible: true })}
            />
          }
        />
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
                      buttons={questionType.map(button => button.name)}
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

export default connect(
  state => ({
    ...state.user,
    ...state.alarm,
  }),
  { openAlarm }
)(HomeScreen);
