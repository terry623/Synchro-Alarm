import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  root: {
    width: '95%',
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
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  titleStyle: {
    paddingBottom: 12,
    fontSize: 24,
    // fontFamily: 'Roboto',
    color: '#000',
  },
  subtitleStyle: {
    opacity: 0.5,
    fontSize: 14,
    // fontFamily: 'Roboto',
    lineHeight: 16,
    color: '#000',
  },
  cardItemImagePlace: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    margin: 16,
  },
  actionBody: {
    flexDirection: 'row',
    padding: 8,
  },
  actionButton1: {
    height: 36,
    padding: 8,
  },
  actionText1: {
    opacity: 0.9,
    fontSize: 14,
    color: '#000',
  },
  actionButton2: {
    height: 36,
    padding: 8,
  },
  actionText2: {
    opacity: 0.9,
    fontSize: 14,
    color: '#000',
  },
});

const MyCard = ({ title, subtitle, alarmId, navigation, socket }) => (
  <View style={styles.root}>
    <View style={styles.cardBody}>
      <View style={styles.bodyContent}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.subtitleStyle}>{subtitle}</Text>
      </View>
      <Image
        style={styles.cardItemImagePlace}
        source={require('../assets/images/icon.png')}
      />
    </View>
    <View style={styles.actionBody}>
      <TouchableOpacity style={styles.actionButton1}>
        <Text
          style={styles.actionText1}
          onPress={() => navigation.navigate('AlarmEdit', { alarmId })}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton2}
        onPress={() => socket.emit('delete', alarmId)}
      >
        <Text style={styles.actionText2}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default connect(state => ({
  ...state.user,
}))(MyCard);
