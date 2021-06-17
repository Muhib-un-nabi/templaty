/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';

import settings from './settings/reducer';
import menu from './menu/reducer';

import user from './user/reducer';

import contacts from './contacts/reducer';
import placeholders from './placeholder/reducer';
import snippets from './snippets/reducer';

const reducers = combineReducers({
  menu,
  settings,
  user,
  contacts,
  placeholders,
  snippets,
  account: () => ({ setting: [] }),
});

export default reducers;
