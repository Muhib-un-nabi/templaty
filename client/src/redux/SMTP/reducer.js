/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_SMTP,
  CLEAR_CURRENT,
  DELETE_SMTP,
  GET_SMTP,
  GET_SMTPS,
  SET_LOADING,
  UPDATE_SMTP
} from './types';

const INITIAL_STATE = {
  smtp: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SMTPS:
      return {
        ...state,
        smtp: action.payload,
        loading: false
      };
    case GET_SMTP:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_SMTP:
      return {
        ...state,
        smtp: [...state.smtp, action.payload],
        loading: false
      };
    case UPDATE_SMTP:
      return {
        ...state,
        smtp: state.smtp.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_SMTP:
      return {
        ...state,
        smtp: state.smtp.filter((ele) => ele._id !== action.payload),
        loading: false
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: {},
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
