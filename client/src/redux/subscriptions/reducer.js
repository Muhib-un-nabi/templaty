/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_SUBSCRIPTION,
  CLEAR_CURRENT,
  DELETE_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  GET_SUBSCRIPTIONS,
  SET_LOADING,
  UPDATE_SUBSCRIPTION
} from './types';

const INITIAL_STATE = {
  subscription: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscription: action.payload,
        loading: false
      };
    case GET_SUBSCRIPTION:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        subscription: [...state.subscription, action.payload],
        loading: false
      };
    case UPDATE_SUBSCRIPTION:
      return {
        ...state,
        subscription: state.subscription.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscription: state.subscription.filter(
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
        loading: action.payload
      };
    default:
      return state;
  }
};
