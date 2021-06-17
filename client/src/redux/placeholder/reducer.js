/* eslint-disable prettier/prettier */
import {
  ADD_PLACEHOLDER,
  CLEAR_CURRENT,
  DELETE_PLACEHOLDER,
  GET_PLACEHOLDER,
  GET_PLACEHOLDERS,
  UPDATE_PLACEHOLDER,
} from './types';

const INITIAL_STATE = {
  placeholders: [],
  current: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLACEHOLDERS:
      return {
        ...state,
        placeholders: action.payload,
      };
    case GET_PLACEHOLDER:
      return {
        ...state,
        current: action.payload,
      };
    case ADD_PLACEHOLDER:
      return {
        ...state,
        placeholders: [...state.placeholders, action.payload],
      };
    case UPDATE_PLACEHOLDER:
      return {
        ...state,
        placeholders: state.placeholders.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
      };
    case DELETE_PLACEHOLDER:
      return {
        ...state,
        placeholders: state.placeholders.filter(
          (ele) => ele._id !== action.payload
        ),
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: {},
      };
    default:
      return state;
  }
};
