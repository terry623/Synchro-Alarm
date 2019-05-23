import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends Component {
  handleDatePicked = date => {
    const { hideDateTimePicker, setAlarmDate } = this.props;
    setAlarmDate(date);
    hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible, hideDateTimePicker } = this.props;

    return (
      <View>
        <Text style={styles.container}>設定一個鬧鐘</Text>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          mode="time"
          onConfirm={this.handleDatePicked}
          onCancel={hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
