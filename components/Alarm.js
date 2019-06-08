import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import color from '../constants/Colors';
import questionType from '../constants/QuestionType';
import Chat from './Chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    padding: 0,
  },
  alarmView: {
    backgroundColor: color.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  question: {
    paddingTop: 15,
    fontSize: 35,
    color: 'white',
  },
});

const Alarm = ({ isAlarmVisible, currentQuestion: { type, part } }) => (
  <Overlay
    fullScreen
    isVisible={isAlarmVisible}
    containerStyle={styles.container}
    overlayStyle={styles.overlay}
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
