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
  SET_LOADING,
  IS_LOGGED_IN,
  GET_ME,
  UPDATE_TEAM_DETAILS,
  CHECK_CPUPON,
  GET_COUPON
} from './types';

const INITIAL_STATE = {
  user: null,
  token: null,
  team: {},
  loading: false,
  isloggedin: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
    case GET_ME:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        isloggedin: true
      };

    case LOG_OUT:
      return {
        user: null,
        token: null,
        loading: false,
        isloggedin: false
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
    case UPDATE_TEAM_DETAILS:
      return {
        ...state,
        team: {
          ...state.team,
          current: { ...state.team.current, ...action.payload }
        }
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case IS_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isloggedin: true
      };
    case CHECK_CPUPON:
      return {
        ...state,
        team: {
          ...state.team,
          package: action.payload
        }
      };
    default:
      return state;
  }
};
