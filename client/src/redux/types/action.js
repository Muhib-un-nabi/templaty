/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_TYPE,
  CLEAR_CURRENT,
  DELETE_TYPE,
  GET_TYPE,
  GET_TYPES,
  SET_LOADING,
  UPDATE_TYPE
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All Types
export const getTypes = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/types', authHeader());
    dispatch({
      type: GET_TYPE,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Types was not Load.',
      3000,
      null,
      null
    );
  }
};
// //  get  Types
export const getType = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/types/${id}`, authHeader());
    dispatch({
      type: GET_TYPE,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Types  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New Types
export const addType = (Types) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/types', Types, authHeader());
    dispatch({
      type: ADD_TYPE,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Types Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, Types  was not added',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};
//  Update Types
export const updateType = (Types, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(`/types/${id}`, Types, authHeader());
    dispatch({
      type: UPDATE_TYPE,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Types Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, Types  was not Updated',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};

//  DELETE New Types
export const deleteType = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/types/${id}`, authHeader());
    dispatch({
      type: DELETE_TYPE,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'Types Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. Types  was not Deleted',
      3000,
      null,
      null
    );
  }
};

// Clear Current From Contact
export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

export const setLoading = (loading = true) => ({
  type: SET_LOADING,
  payload: loading
});
