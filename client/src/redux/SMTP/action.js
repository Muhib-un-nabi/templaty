/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_OR__UPDATE_SMTP,
  CLEAR_CURRENT,
  DELETE_SMTP,
  GET_SMTP,
  GET_SMTPS,
  SET_LOADING,
  SEND_MAIL
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All SMTP
export const getSMTPS = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/smtp', authHeader());
    dispatch({
      type: GET_SMTPS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, SMTP Accounts was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
// //  get  SMTP
export const getSMTP = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/smtp/${id}`, authHeader());
    dispatch({
      type: GET_SMTP,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, SMTP Account was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New SMTP
export const addORupdateSMTP = (SMTP) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/smtp', SMTP, authHeader());
    dispatch({
      type: ADD_OR__UPDATE_SMTP,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'SMTP Setting Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, SMTP Setting was not Updated',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
//  Update SMTP
// export const addORupdateSMTP = (SMTP, id) => async (dispatch) => {
//   try {
//     const { data } = await serverApi.patch(`/smtp/${id}`, SMTP, authHeader());
//     dispatch({
//       type: UPDATE_SMTP,
//       payload: data.data.data
//     });
//     NotificationManager.success(
//       'Success message',
//       'SMTP Updated successfully',
//       3000,
//       null,
//       null
//     );
//   } catch (err) {
//     NotificationManager.error(
//       'Success message',
//       'Somthing Wrong, SMTP  was not Updated',
//       3000,
//       null,
//       null
//     );
//     // throw new Error(err);
//   }
// };

//  DELETE New SMTP

export const deleteSMTP = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/smtp/${id}`, authHeader());
    dispatch({
      type: DELETE_SMTP,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'SMTP Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. SMTP  was not Deleted',
      3000,
      null,
      null
    );
  }
};

export const senMail = (mail) => async (dispatch) => {
  try {
    await serverApi.post(`/smtp/send`, mail, authHeader());
    NotificationManager.success(
      'Success message',
      'Sending Mail request was proceeded',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong.Sending Mail request was not proceeded',
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
