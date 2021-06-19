/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
import {
  ADD_PLACEHOLDER,
  CLEAR_CURRENT,
  DELETE_PLACEHOLDER,
  GET_PLACEHOLDER,
  GET_PLACEHOLDERS,
  UPDATE_PLACEHOLDER,
  SET_LOADING
} from './types';

const INITIAL_STATE = {
  placeholders: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLACEHOLDERS:
      return {
        ...state,
        placeholders: action.payload,
        loading: false
      };
    case GET_PLACEHOLDER:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_PLACEHOLDER:
      return {
        ...state,
        placeholders: [...state.placeholders, action.payload],
        loading: false
      };
    case UPDATE_PLACEHOLDER:
      return {
        ...state,
        placeholders: state.placeholders.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_PLACEHOLDER:
      return {
        ...state,
        placeholders: state.placeholders.filter(
          (ele) => ele._id !== action.payload
        ),
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
        loading: true
      };
    default:
      return state;
  }
};
