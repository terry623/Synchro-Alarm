import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Header, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import color from '../constants/Colors';
import Alarm from '../components/Alarm';
import MyCard from '../components/MyCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  alarmContainer: {
    alignItems: 'center',
  },
  noAlarm: {
    paddingTop: 15,
  },
  alarmCard: {
    width: '95%',
    height: 300,
    marginVertical: 5,
    elevation: 3,
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: 'hidden',
  },
  header: {
    height: 80,
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { alarms, userName, navigation } = this.props;
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
              onPress={() => navigation.navigate('AlarmSetup')}
            />
          }
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.alarmContainer}>
            {alarms.length > 0 ? (
              alarms.map(alarm => (
                <MyCard
                  key={alarm.alarmId}
                  title={`${new Date(
                    alarm.originTime
                  ).getHours()} 時 ${new Date(
                    alarm.originTime
                  ).getMinutes()} 分`}
                  subtitle={
                    userName === alarm.user1 ? alarm.user2 : alarm.user1
                  }
                  alarmId={alarm.alarmId}
                  navigation={navigation}
                />
              ))
            ) : (
              <Text style={styles.noAlarm}>目前沒有鬧鐘</Text>
            )}
          </View>
          <Alarm />
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  ...state.user,
  ...state.alarm,
}))(HomeScreen);
