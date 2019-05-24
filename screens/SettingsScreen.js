import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

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

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: '設定',
  };

  render() {
    return (
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon, type: 'ionicon' }}
            onPress={() => undefined}
          />
        ))}
      </View>
    );
  }
}
