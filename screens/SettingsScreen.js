import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';

import color from '../constants/Colors';

const list = [
  {
    title: '個人檔案',
    icon: 'ios-contact',
  },
  {
    title: 'FAQ',
    icon: 'ios-help-circle',
  },
  {
    title: '公告',
    icon: 'ios-megaphone',
  },
  {
    title: '聯絡我們',
    icon: 'ios-create',
  },
  {
    title: '給予評價',
    icon: 'ios-ribbon',
  },
  {
    title: '升級',
    icon: 'ios-rocket',
  },
];

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  listItem: {
    borderBottomColor: '#D1D1D6',
    borderBottomWidth: 1,
  },
});

export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;

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
            text: 'Setting',
            style: { color: '#fff', fontSize: 21 },
          }}
        />
        {list.map((item, i) => (
          <ListItem
            chevron
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon, type: 'ionicon' }}
            containerStyle={styles.listItem}
            onPress={() => undefined}
          />
        ))}
      </View>
    );
  }
}
