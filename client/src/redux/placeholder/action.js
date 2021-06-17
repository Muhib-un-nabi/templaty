/* eslint-disable prettier/prettier */
import {
  ADD_PLACEHOLDER,
  CLEAR_CURRENT,
  DELETE_PLACEHOLDER,
  GET_PLACEHOLDER,
  GET_PLACEHOLDERS,
  UPDATE_PLACEHOLDER,
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

//  get All placeholders
export const getPlaceholders = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/placeholders', authHeader());
    dispatch({
      type: GET_PLACEHOLDERS,
      payload: data.data.data,
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, placeholders  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  get All placeholders
export const getPlaceholder = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/placeholders/${id}`, authHeader());
    dispatch({
      type: GET_PLACEHOLDER,
      payload: data.data.data,
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, placeholders  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New placeholders
export const addPlaceholder = (placeholders) => async (dispatch) => {
  try {
    const { data } = await serverApi.post(
      '/placeholders',
      placeholders,
      authHeader()
    );
    dispatch({
      type: ADD_PLACEHOLDER,
      payload: data.data.data,
    });
    NotificationManager.success(
      'Success message',
      'placeholders Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, placeholders  was not added',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
//  Update placeholders
export const updatePlaceholder = (placeholder, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/placeholders/${id}`,
      placeholder,
      authHeader()
    );
    dispatch({
      type: UPDATE_PLACEHOLDER,
      payload: data.data.data,
    });
    NotificationManager.success(
      'Success message',
      'placeholders Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, placeholders  was not Updated',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};

//  DELETE New placeholders
export const deletePlaceholder = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/placeholders/${id}`, authHeader());
    dispatch({
      type: DELETE_PLACEHOLDER,
      payload: id,
    });
    NotificationManager.success(
      'Success message',
      'placeholders Deleted  successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. placeholders  was not Deleted',
      3000,
      null,
      null
    );
  }
};

// Clear Current From Contact
export const clearCurrent = () => ({
  type: CLEAR_CURRENT,
});
