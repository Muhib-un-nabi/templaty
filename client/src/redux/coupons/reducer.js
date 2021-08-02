/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_COUPON,
  CLEAR_CURRENT,
  DELETE_COUPON,
  GET_COUPON,
  GET_COUPONS,
  SET_LOADING,
  UPDATE_COUPON
} from './types';

const INITIAL_STATE = {
  coupons: [],
  current: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.payload,
        loading: false
      };
    case GET_COUPON:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_COUPON:
      return {
        ...state,
        coupons: [...state.coupons, action.payload],
        loading: false
      };
    case UPDATE_COUPON:
      return {
        ...state,
        coupons: state.coupons.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_COUPON:
      return {
        ...state,
        coupons: state.coupons.filter((ele) => ele._id !== action.payload),
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
