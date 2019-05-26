import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import Chat from './Chat';

// FIXME: 題目之後要放在 Server 端 ( JSON )
const allTopics = [
  ['真是', '適合', '起床', '的日子'],
  ['非常', '苦悶', '的生活', '啊'],
];

class Alarm extends Component {
  render() {
    const { isAlarmVisible } = this.props;
    const randTopic = allTopics[Math.floor(Math.random() * allTopics.length)];

    return (
      <Overlay
        fullScreen
        isVisible={isAlarmVisible}
        containerStyle={styles.container}
      >
        <View style={styles.view}>
          <View style={styles.alarmView}>
            <Text style={styles.title}>拼句子</Text>
            <Text style={styles.topic}>
              {randTopic.filter((value, index) => index % 2 === 0).join(' / ')}
            </Text>
            {/* FIXME: 為了測試 */}
            <Text style={styles.topic}>
              ({randTopic.filter((value, index) => index % 2 !== 0).join(' / ')}
              )
            </Text>
          </View>
          <Chat topic={randTopic} />
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
