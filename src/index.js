import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootNavigator } from './routes/AppNavigator';

export default class Root extends Component {
  render() {
    let Navigator = RootNavigator();

    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
