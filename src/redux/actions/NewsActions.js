import { FETCH_NEWS } from './types';
import axios from 'axios';
import { FIREBASEURL } from '../../helpers/misc';
import { news } from '../../helpers/data';

export function fetchNews() {
  const request = news;
  return {
    type: FETCH_NEWS,
    payload: request
  };
}
