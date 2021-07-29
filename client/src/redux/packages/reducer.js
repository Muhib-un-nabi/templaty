/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_PAKAGE,
  CLEAR_CURRENT,
  DELETE_PAKAGE,
  GET_PAKAGE,
  GET_PAKAGES,
  SET_LOADING,
  UPDATE_PAKAGE
} from './types';

const INITIAL_STATE = {
  packages: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAKAGES:
      return {
        ...state,
        packages: action.payload,
        loading: false
      };
    case GET_PAKAGE:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_PAKAGE:
      return {
        ...state,
        packages: [...state.packages, action.payload],
        loading: false
      };
    case UPDATE_PAKAGE:
      return {
        ...state,
        packages: state.packages.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_PAKAGE:
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
