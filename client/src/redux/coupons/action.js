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

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All Coupons
export const getCoupons = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/coupons', authHeader());
    dispatch({
      type: GET_COUPONS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Coupons was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
// //  get  Coupons
export const getCoupon = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/coupons/${id}`, authHeader());
    dispatch({
      type: GET_COUPON,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Coupons  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New Coupons
export const addCoupon = (Coupons) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/coupons', Coupons, authHeader());
    dispatch({
      type: ADD_COUPON,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Coupons Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, Coupons  was not added',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};
//  Update Coupons
export const updateCoupon = (Coupons, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/coupons/${id}`,
      Coupons,
      authHeader()
    );
    dispatch({
      type: UPDATE_COUPON,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Coupons Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, Coupons  was not Updated',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};

//  DELETE New Coupons
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/coupons/${id}`, authHeader());
    dispatch({
      type: DELETE_COUPON,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'Coupons Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. Coupons  was not Deleted',
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
