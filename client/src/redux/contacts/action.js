/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import {
  SAVE_CONTACT_SETTING,
  GET_CONTACT_SETTING,
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  UPDATE_CONTACT,
  GET_CONTACT,
  CLEAR_CURRENT,
  SET_LOADING
} from './types';
import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';
//  Save Contact Seting

export const getInputField = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/contacts/setting/', authHeader());
    dispatch({
      type: GET_CONTACT_SETTING,
      payload: data.data.data.setting
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Contact setting was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err.response.status);
  }
};

export const saveContactSetting = (setting) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      '/contacts/setting/',
      {
        setting
      },
      authHeader()
    );
    dispatch({
      type: SAVE_CONTACT_SETTING,
      payload: data.data.data.setting
    });
    NotificationManager.success(
      'Success message',
      'Contact setting save successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong . Contact setting was not save',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};

//  get All Contacts
export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/contacts', authHeader());
    dispatch({
      type: GET_CONTACTS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Contact  was not Load.',
      3000,
      null,
      null
    );
    throw new Error(err.response.status);
  }
};
//  get All Contacts
export const getContact = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/contacts/${id}`, authHeader());
    dispatch({
      type: GET_CONTACT,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, Contact  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New Contact
export const addContact = (contact) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/contacts', contact, authHeader());
    dispatch({
      type: ADD_CONTACT,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Contact Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, Contact  was not added',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
//  AUpdate  Contact
export const updateContact = (contact, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/contacts/${id}`,
      contact,
      authHeader()
    );
    dispatch({
      type: UPDATE_CONTACT,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'Contact Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing Wrong, Contact  was not Updated',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};

//  DELETE New Contact
export const deleteContact = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/contacts/${id}`, authHeader());
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'Contact Deleted  successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. Contact  was not Deleted',
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
