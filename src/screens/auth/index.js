import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import LogoImage from '../../../assets/nba_login_logo.png';
import FormLogin from './FormLogin';
import { connect } from 'react-redux';
import { autoLogin } from '../../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { getTokens, setTokens } from '../../helpers/misc';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  //routing history push ke component lain
  goNext = () => {
    this.props.navigation.navigate('App');
  };

  componentDidMount() {
    getTokens(value => {
      // console.log('get tokens', value);

      //check token values ,mengambil token sebelumnnya
      if (value[0][1] === null) {
        this.setState({ isFetching: false });
      } else {
        //jalankan function method dispatch autologin, dan menyimpan refresh token
        this.props.autoLogin(value[1][1]).then(() => {
          if (!this.props.users.token) {
            this.setState({ isFetching: false });
          } else {
            //simpan token
            setTokens(this.props.users, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }

  render() {
    const { isFetching } = this.state;

    return (
      <View style={styles.container}>
        {isFetching ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <ScrollView>
              <Image
                source={LogoImage}
                resizeMode={'center'}
                style={{ width: 270, height: 150 }}
              />
              <FormLogin goNext={this.goNext} />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

//styling css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d428a',
    padding: 50
  },
  loading: {
    flex: 1,
    backgroundColor: '#1d428a',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    users: state.Users.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoLogin }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
