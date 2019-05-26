import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import Chat from './Chat';

class Alarm extends Component {
  render() {
    const {
      isAlarmVisible,
      alarmDetail: { topics },
    } = this.props;

    return (
      <Overlay
        fullScreen
        isVisible={isAlarmVisible}
        containerStyle={styles.container}
      >
        <View style={styles.view}>
          <View style={styles.alarmView}>
            <Text style={styles.title}>拼句子</Text>
            <Text style={styles.topic}>{topics[0]}</Text>
            <Text style={styles.topic}>
              {/* FIXME: 自己邀請自己 => 就會有 topics[1] */}
              {topics[1] && `(對方 : ${topics[1]})`}
            </Text>
          </View>
          <Chat />
        </View>
      </Overlay>
    );
  }
}

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
  topic: {
    paddingTop: 10,
    fontSize: 15,
  },
});

export default connect(state => ({
  ...state.alarm,
}))(Alarm);
