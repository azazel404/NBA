import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import InputForm from '../../helpers/FormInput';
import ValidationRules from '../../helpers/ValidationRules';
import { connect } from 'react-redux';
import { Login, Register } from '../../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { setTokens } from '../../helpers/misc';

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Login',
      action: 'Login',
      actionMode: 'I want to register',
      hasErrors: false,
      form: {
        email: {
          value: '',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            isEmail: true
          }
        },
        password: {
          value: '',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            minLength: 6
          }
        },
        confirmPassword: {
          value: '',
          valid: false,
          type: 'textinput',
          rules: {
            confirmPass: 'password'
          }
        }
      }
    };
  }

  //change type login and register component
  ChangeFormType = () => {
    let type = this.state.type;

    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode: type === 'Login' ? 'I want Login' : 'I want to register'
    });
  };

  //validate notify error
  formHasErrors = () => {
    return this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, Check your Info.</Text>
      </View>
    ) : null;
  };

  //handle change value need 2 argument, for use it
  handleChange = (name, value) => {
    this.setState({
      hasErrors: false
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;

    //validation rules
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  SubmitLogin = () => {
    let isFormValid = true;
    let formToSubmit = {};

    const formCopy = this.state.form;

    //ngolah dan memodifikasi membedakan register dan login
    for (let key in formCopy) {
      if (this.state.type === 'Login') {
        //Login
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        //Register
        isFormValid = isFormValid && formCopy[key].value;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    //form login and register jika sukses
    if (isFormValid) {
      if (this.state.type === 'Login') {
        this.props.Login(formToSubmit).then(() => {
          if (!this.props.users.uid) {
            this.setState({ hasErrors: true });
          } else {
            setTokens(this.props.users, () => {
              this.setState({ hasErrors: false });
              this.props.goNext();
            });
          }
        });
      } else {
        this.props.Register(formToSubmit);
      }
    } else {
      this.setState({
        hasErrors: true
      });
    }
  };

  //form input confirm repeate password for register
  confirmPasswordRender = () => {
    return this.state.type !== 'Login' ? (
      <InputForm
        placeholder="Confirm your password"
        placeholderTextColor="#cecece"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.handleChange('confirmPassword', value)}
        secureTextEntry
      />
    ) : null;
  };

  render() {
    // console.log("user data token :",this.props.users);
    return (
      <View>
        <InputForm
          placeholder="Enter email"
          placeholderTextColor="#cecece"
          autoCapitalize={'none'}
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.handleChange('email', value)}
          keyboardType={'email-address'}
        />
        <InputForm
          placeholder="Enter your password"
          placeholderTextColor="#cecece"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.handleChange('password', value)}
          secureTextEntry
        />
        {this.confirmPasswordRender()}
        {this.formHasErrors()}

        <View style={{ marginTop: 20 }}>
          <View style={styles.button}>
            <Button title={this.state.action} onPress={this.SubmitLogin} />
          </View>
          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              onPress={this.ChangeFormType}
            />
          </View>
          {/* <View style={styles.button}>
            <Button
              title="I'll do it later"
              onPress={() => this.props.goNext()}
            />
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336'
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  //styling 2 platform android dan ios
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0
      },
      android: {
        marginTop: 10,
        marginBottom: 10
      }
    })
  }
});

function mapStateToProps(state) {
  return {
    users: state.Users.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ Login, Register }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLogin);
