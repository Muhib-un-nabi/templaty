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
    case ADD_TEMPLATE:
      return {
        ...state,
        template: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
