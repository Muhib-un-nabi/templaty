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

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All Subscriptions
export const getSubscriptions = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/subscription', authHeader());
    dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Subscriptions was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
// //  get  Subscriptions
export const getSubscription = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/subscription/${id}`, authHeader());
    dispatch({
      type: GET_SUBSCRIPTION,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Subscriptions  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New Subscriptions
export const addSubscription = (Subscriptions) => async (dispatch) => {
  try {
    const { data } = await serverApi.post(
      '/subscription',
      Subscriptions,
      authHeader()
    );
    dispatch({
      type: ADD_SUBSCRIPTION,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Subscriptions Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, Subscriptions  was not added',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};
//  Update Subscriptions
export const updateSubscription = (Subscriptions, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/subscription/${id}`,
      Subscriptions,
      authHeader()
    );
    dispatch({
      type: UPDATE_SUBSCRIPTION,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Subscriptions Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, Subscriptions  was not Updated',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};

//  DELETE New Subscriptions
export const deleteSubscription = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/subscription/${id}`, authHeader());
    dispatch({
      type: DELETE_SUBSCRIPTION,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'Subscriptions Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. Subscriptions  was not Deleted',
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
