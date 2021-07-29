/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_NOTIFICATION,
  CLEAR_CURRENT,
  DELETE_NOTIFICATION,
  GET_NOTIFICATION,
  GET_NOTIFICATIONS,
  SET_LOADING,
  UPDATE_NOTIFICATION
} from './types';

const INITIAL_STATE = {
  packages: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        packages: action.payload,
        loading: false
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        packages: [...state.packages, action.payload],
        loading: false
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        packages: state.packages.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        packages: state.packages.filter((ele) => ele._id !== action.payload),
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
