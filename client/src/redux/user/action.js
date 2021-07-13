/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
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
  GET_ME
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';

import serverApi, { authHeader } from '../../api/index';
//  Save Contact Seting

export const signup = (userData) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/users', userData);
    dispatch({
      type: SIGN_UP,
      payload: {
        token: data.token,
        user: data.data.user
      }
    });
    setToken(data.token);
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing went Wrong, Please Try again',
      3000,
      null,
      null
    );
    throw new Error('Somthing went Wrong, Please Try again');
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await serverApi.post('/users/login', userData);
    dispatch({
      type: LOG_IN,
      payload: {
        token: data.token,
        user: data.data.user
      }
    });
    setToken(data.token);
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Wrong Email and Password.',
      3000,
      null,
      null
    );
    throw new Error('Somthing went Wrong, Please Try again');
  }
};

//  Admin CAntrooles
//  get Team Detail
export const getTeamDetails = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/team/detail', authHeader());
    dispatch({
      type: GET_TEAM_DETAILS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Team  was not Load.',
      3000,
      null,
      null
    );
    // throw new Error('Somthing went Wrong, Please Try again');
  }
};

export const getMe = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/users/me', authHeader());
    dispatch({
      type: GET_ME,
      payload: {
        token: sessionStorage.getItem('token'),
        user: data.data.data
      }
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Team  was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err.response.status);
  }
};
//  Add New User
export const addNewUser = (userData) => async (dispatch) => {
  try {
    const { data } = await serverApi.post(
      '/team/users',
      userData,
      authHeader()
    );
    dispatch({
      type: ADD_NEW_USER_IN_TEAM,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing went Wrong, Please Try again',
      3000,
      null,
      null
    );
  }
};

//
export const isLogin = () => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/users/islogin', authHeader());
    dispatch({
      type: IS_LOGGED_IN,
      payload: {
        user: data.data.data,
        token: data.token
      }
    });
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing went Wrong, Please Try again',
      3000,
      null,
      null
    );
  }
};

//  Delete User
export const deleteUserByAdmin =
  (id, deleteUserData, asignTo) => async (dispatch) => {
    try {
      await serverApi.delete(
        `/team/users/${id}?deleteUserData=${deleteUserData}&asignTo=${asignTo}`,
        authHeader()
      );
      dispatch({
        type: DELETE_USER_BY_ADMIN,
        payload: id
      });
    } catch (err) {
      NotificationManager.error(
        'Warning message',
        'Somthing went Wrong , Please Try again',
        3000,
        null,
        null
      );
      throw new Error('Somthing went Wrong, Please Try again');
    }
  };

//  Not Working
export const forgetPassword = (email) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('users/forgotPassword', email);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    NotificationManager.success(
      'Success message',
      data.message,
      3000,
      null,
      null
    );
    return true;
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Wrong Email ',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/login');
    dispatch({
      type: SIGN_UP,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Wrong Email and Password',
      3000,
      null,
      null
    );
    throw new Error('Somthing went Wrong, Please Try again');
  }
};

export const resetPassword = () => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/login');
    dispatch({
      type: SIGN_UP,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Wrong Email and Password',
      3000,
      null,
      null
    );
    throw new Error('Somthing went Wrong, Please Try again');
  }
};

/// SMTP Configration

const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const setLoading = (loading = true) => ({
  type: SET_LOADING,
  payload: loading
});
