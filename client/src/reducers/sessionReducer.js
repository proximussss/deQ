import {
    GET_SESSIONS,
    SESSION_ERROR
  } from '../actions/types';
  
  const initialState = {
    sessions: [],
    loading: true,
    error: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_SESSIONS:
        return {
          ...state,
          sessions: payload,
          loading: false
        };
      case SESSION_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }