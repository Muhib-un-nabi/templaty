/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import {
  DELETE_ACCOUNT,
  FORGET_PASSWORD,
  LOG_IN,
  LOG_OUT,
  RESET_PASSWORD,
  SIGN_UP,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  ADD_NEW_USER_IN_TEAM,
  GET_TEAM_DETAILS,
  DELETE_USER_BY_ADMIN,
  SET_LOADING
} from './types';

const INITIAL_STATE = {
  user: null,
  token: null,
  team: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case LOG_OUT:
      return {
        user: null,
        token: null,
        loading: false
      };
    case ADD_NEW_USER_IN_TEAM:
    case GET_TEAM_DETAILS:
      return {
        ...state,
        team: action.payload,
        loading: false
      };
    case DELETE_USER_BY_ADMIN:
      return {
        ...state,
        team: {
          ...state.team,
          users: state.team.users.filter((user) => user._id !== action.payload)
        },
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
