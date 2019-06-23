import { AsyncStorage } from 'react-native';

export const FIREBASEURL = `basketball-rn.firebaseapp.com`;
export const FIREBASEDATABASE = `https://basketball-rn.firebaseio.com`;
export const APIKEY = `AIzaSyDz61GNpwFhXTgqDoEke0rzx7-xtmfeNDI`;
export const SIGN_UP_USER = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGN_IN_USER = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getTokens = callback => {
  AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshToken',
    '@nba_app@expireToken',
    '@nba_app@uid'
  ]).then(value => {
    callback(value);
  });
};

export const setTokens = (values, callback) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ['@nba_app@token', values.token],
    ['@nba_app@refreshToken', values.refToken],
    ['@nba_app@expireToken', expiration.toString()],
    ['@nba_app@uid', values.uid]
  ]).then(response => {
    callback();
  });
};

export const convertFirebase = data => {
  const newData = [];

  for (let key in data) {
    newData.push({
      ...data[key],
      id: key
    });
  }
  return newData;
};

export const findTeamData = (itemId, teams) => {
  const value = teams.find(team => {
    return team.id === itemId;
  });
  return value;
};
