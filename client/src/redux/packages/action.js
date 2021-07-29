/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_PAKAGE,
  CLEAR_CURRENT,
  DELETE_PAKAGE,
  GET_PAKAGE,
  GET_PAKAGES,
  SET_LOADING,
  UPDATE_PAKAGE
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All package
export const getPackages = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/package', authHeader());
    dispatch({
      type: GET_PAKAGES,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Error message',
      'Somthing went Wrong, package was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
// //  get  package
export const getPackage = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/package/${id}`, authHeader());
    dispatch({
      type: GET_PAKAGE,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, package  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New package
export const addPackage = (packageData) => async (dispatch) => {
  try {
    const { data } = await serverApi.post(
      '/package',
      packageData,
      authHeader()
    );
    dispatch({
      type: ADD_PAKAGE,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'package Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, package  was not added',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};
//  Update package
export const updatePackage = (packageData, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/package/${id}`,
      packageData,
      authHeader()
    );
    dispatch({
      type: UPDATE_PAKAGE,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'package Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, package  was not Updated',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};

//  DELETE New package
export const deletePackage = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/package/${id}`, authHeader());
    dispatch({
      type: DELETE_PAKAGE,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'package Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. package  was not Deleted',
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
