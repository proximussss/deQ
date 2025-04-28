import axios from 'axios';
import {
  GET_SESSIONS,
  SESSION_ERROR
} from './types';

// Get session logs
export const getSessions = () => async dispatch => {
  try {
    const res = await axios.get('/api/sessions');

    dispatch({
      type: GET_SESSIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SESSION_ERROR,
      payload: err.response?.data.msg || 'Error loading sessions'
    });
  }
};