import { FETCH_NEWS } from '../actions/types';

const initialState = {
  newsData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS: {
      let newState = { ...state };
      newState.newsData = [];

      //data object , try to push in array empty with looping
      for (let key in action.payload) {
        newState.newsData.push({ ...action.payload[key], id: key });
      }

      return newState;
    }
    default:
      return state;
  }
}
