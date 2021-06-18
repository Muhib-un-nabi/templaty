/* eslint-disable prettier/prettier */
import {
  ADD_SNIPPET,
  CLEAR_CURRENT,
  DELETE_SNIPPET,
  GET_SNIPPET,
  GET_SNIPPETS,
  UPDATE_SNIPPET
} from './types';

import { NotificationManager } from '../../components/common/react-notifications';
import serverApi, { authHeader } from '../../api/index';

//  get All snippets
export const getSnippets = () => async (dispatch) => {
  try {
    const { data } = await serverApi.get('/snippets', authHeader());
    dispatch({
      type: GET_SNIPPETS,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, snippets  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  get All snippets
export const getSnippet = (id) => async (dispatch) => {
  try {
    const { data } = await serverApi.get(`/snippets/${id}`, authHeader());
    dispatch({
      type: GET_SNIPPET,
      payload: data.data.data
    });
  } catch (err) {
    NotificationManager.error(
      'Success message',
      'Somthing went Wrong, snippets  was not Load.',
      3000,
      null,
      null
    );
  }
};
//  Add New snippets
export const addSnippet = (snippets) => async (dispatch) => {
  try {
    const { data } = await serverApi.post('/snippets', snippets, authHeader());
    dispatch({
      type: ADD_SNIPPET,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'snippets Added successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong, snippets  was not added',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};
//  Update snippets
export const updateSnippet = (snippet, id) => async (dispatch) => {
  try {
    const { data } = await serverApi.patch(
      `/snippets/${id}`,
      snippet,
      authHeader()
    );
    dispatch({
      type: UPDATE_SNIPPET,
      payload: data.data.data
    });
    NotificationManager.success(
      'Success message',
      'snippets Updated successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warnning message',
      'Somthing Wrong, snippets  was not Updated',
      3000,
      null,
      null
    );
    throw new Error(err);
  }
};

//  DELETE New snippets
export const deleteSnippet = (id) => async (dispatch) => {
  try {
    await serverApi.delete(`/snippets/${id}`, authHeader());
    dispatch({
      type: DELETE_SNIPPET,
      payload: id
    });
    NotificationManager.success(
      'Success message',
      'snippets Deleted  successfully',
      3000,
      null,
      null
    );
  } catch (err) {
    NotificationManager.error(
      'Warning message',
      'Somthing Wrong. snippets  was not Deleted',
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
