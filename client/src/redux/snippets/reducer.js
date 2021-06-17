/* eslint-disable prettier/prettier */
import {
  ADD_SNIPPET,
  CLEAR_CURRENT,
  DELETE_SNIPPET,
  GET_SNIPPET,
  GET_SNIPPETS,
  UPDATE_SNIPPET,
} from './types';

const INITIAL_STATE = {
  snippets: [],
  current: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SNIPPETS:
      return {
        ...state,
        snippets: action.payload,
      };
    case GET_SNIPPET:
      return {
        ...state,
        current: action.payload,
      };
    case ADD_SNIPPET:
      return {
        ...state,
        snippets: [...state.snippets, action.payload],
      };
    case UPDATE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
      };
    case DELETE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter((ele) => ele._id !== action.payload),
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
