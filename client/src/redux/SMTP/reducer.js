/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  CLEAR_CURRENT,
  DELETE_SMTP,
  GET_SMTP,
  GET_SMTPS,
  SET_LOADING,
  ADD_OR__UPDATE_SMTP
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
    case ADD_OR__UPDATE_SMTP:
      const has = state.smtp.find((ele) => ele._id === action.payload._id);
      if (has) {
        return {
          ...state,
          smtp: state.smtp.map((ele) =>
            ele._id === has._id ? action.payload : ele
          ),
          loading: false
        };
      }
      return {
        ...state,
        smtp: [...state.smtp, action.payload],
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
