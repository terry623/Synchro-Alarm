import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import questionType from '../constants/QuestionType';

import Chat from './Chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    height: '100%',
  },
  alarmView: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
  },
  question: {
    paddingTop: 10,
    fontSize: 15,
  },
});

const Alarm = ({ isAlarmVisible, currentQuestion: { type, part } }) => (
  <Overlay
    fullScreen
    isVisible={isAlarmVisible}
    containerStyle={styles.container}
  >
    <View style={styles.view}>
      <View style={styles.alarmView}>
        <Text style={styles.title}>
          {questionType.find(q => q.type === type)
            ? questionType.find(q => q.type === type).name
            : ''}
        </Text>
        <Text style={styles.question}>{part}</Text>
      </View>
      <Chat />
    </View>
  </Overlay>
);

export default connect(state => ({
  ...state.alarm,
}))(Alarm);
