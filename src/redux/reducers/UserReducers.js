import { LOGIN_USER, REGISTER_USER, AUTO_LOGIN } from '../actions/types';

const initialState = {
  auth: {
    uid: null,
    token: null,
    refToken: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER: {
      let newState = { ...state };
      newState.auth.uid = action.payload.localId || false;
      newState.auth.token = action.payload.idToken || false;
      newState.auth.refToken = action.payload.refreshToken || false;

      return newState;
    }
    case LOGIN_USER: {
      let newState = { ...state };
      newState.auth.uid = action.payload.localId || false;
      newState.auth.token = action.payload.idToken || false;
      newState.auth.refToken = action.payload.refreshToken || false;

      return newState;
    }
    case AUTO_LOGIN: {
      let newState = { ...state };
      newState.auth.uid = action.payload.localId || false;
      newState.auth.token = action.payload.idToken || false;
      newState.auth.refToken = action.payload.refreshToken || false;

      return newState;
    }
    default:
      return state;
  }
}
