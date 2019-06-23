import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTO_LOGIN } from './types';
import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  FIREBASEURL,
  REFRESH
} from '../../helpers/misc';

export function Register(data) {
  const request = axios({
    method: 'POST',
    url: SIGN_UP_USER,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    header: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function Login(data) {
  const request = axios({
    method: 'POST',
    url: SIGN_IN_USER,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    header: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export const autoLogin = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: 'grant_type=refresh_token&refresh_token=' + refToken,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: AUTO_LOGIN,
    payload: request
  };
};
