/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_TYPE,
  CLEAR_CURRENT,
  DELETE_TYPE,
  GET_TYPE,
  GET_TYPES,
  SET_LOADING,
  UPDATE_TYPE
} from './types';

const INITIAL_STATE = {
  types: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
        loading: false
      };
    case GET_TYPE:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_TYPE:
      return {
        ...state,
        types: [...state.types, action.payload],
        loading: false
      };
    case UPDATE_TYPE:
      return {
        ...state,
        types: state.types.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_TYPE:
      return {
        ...state,
        types: state.types.filter((ele) => ele._id !== action.payload),
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
