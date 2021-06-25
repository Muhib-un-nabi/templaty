/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_TEMPLATE,
  CLEAR_CURRENT,
  DELETE_TEMPLATE,
  SET_LOADING,
  UPDATE_TEMPLATE,
  GET_TEMPLATE,
  GET_TEMPLATES
} from './types';

const INITIAL_STATE = {
  template: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEMPLATES:
      return {
        ...state,
        template: action.payload,
        loading: false
      };
    case GET_TEMPLATE:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_TEMPLATE:
      return {
        ...state,
        template: [...state.template, action.payload],
        loading: false
      };
    case DELETE_TEMPLATE:
      return {
        ...state,
        template: state.template.filter((ele) => ele._id !== action.payload),
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
