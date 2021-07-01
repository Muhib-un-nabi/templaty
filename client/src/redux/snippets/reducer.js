/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
import {
  ADD_SNIPPET,
  CLEAR_CURRENT,
  DELETE_SNIPPET,
  GET_SNIPPET,
  GET_SNIPPETS,
  UPDATE_SNIPPET,
  SET_LOADING
} from './types';

const INITIAL_STATE = {
  snippets: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SNIPPETS:
      return {
        ...state,
        snippets: action.payload,
        loading: false
      };
    case GET_SNIPPET:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_SNIPPET:
      return {
        ...state,
        snippets: [...state.snippets, action.payload],
        loading: false
      };
    case UPDATE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter((ele) => ele._id !== action.payload),
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
