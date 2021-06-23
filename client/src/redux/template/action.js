/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ADD_TEMPLATE,
  CLEAR_CURRENT,
  DELETE_TEMPLATE,
  GET_TEMPLATE,
  GET_TEMPLATES,
  SET_LOADING
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

// //  get All Template
export const getTemplates = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/templates', authHeader());
    dispatch({
      type: GET_TEMPLATES,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Template was not Load.',
      3000,
      null,
      null
    );
  }
};
// //  get  Template
// export const getPlaceholder = (id) => async (dispatch) => {
//   try {
//     const { data } = await serverApi.get(`/templates/${id}`, authHeader());
//     dispatch({
//       type: GET_PLACEHOLDER,
//       payload: data.data.data
//     });
//   } catch (err) {
//     NotificationManager.error(
//       'Success message',
//       'Somthing went Wrong, Template  was not Load.',
//       3000,
//       null,
//       null
//     );
//   }
// };
//  Add New Template
export const addTemplate = (Template) => async (dispatch) => {
  try {
    const { data } = await serverApi.post(
      '/templates',
      Template,
      authHeader()
    );
    dispatch({
      type: ADD_TEMPLATE,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Template Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, Template  was not added',
      3000,
      null,
      null
    );
    // throw new Error(err);
  }
};
// //  Update Template
// export const updatePlaceholder = (placeholder, id) => async (dispatch) => {
//   try {
//     const { data } = await serverApi.patch(
//       `/templates/${id}`,
//       placeholder,
//       authHeader()
//     );
//     dispatch({
//       type: UPDATE_PLACEHOLDER,
//       payload: data.data.data
//     });
//     NotificationManager.success(
//       'Success message',
//       'Template Updated successfully',
//       3000,
//       null,
//       null
//     );
//   } catch (err) {
//     NotificationManager.error(
//       'Success message',
//       'Somthing Wrong, Template  was not Updated',
//       3000,
//       null,
//       null
//     );
//     throw new Error(err);
//   }
// };

//  DELETE New Template
export const deletePlaceholder = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/templates/${id}`, authHeader());
    dispatch({
      type: DELETE_TEMPLATE,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'Template Deleted successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. Template  was not Deleted',
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
