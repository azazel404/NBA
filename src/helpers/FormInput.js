import React, { Component } from 'react';
import { Text, View, TextInput, Picker, StyleSheet } from 'react-native';

const InputForm = props => {
  let template = null;

  switch (props.type) {
    case 'textinput':
      template = (
        <TextInput
          {...props}
          style={[styles.InputForm, props.overrideStyles]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  InputForm: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 16,
    padding: 5,
    marginTop: 10,
    color: '#fff'
  }
});

export default InputForm;
