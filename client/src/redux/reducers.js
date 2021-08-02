/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';

import settings from './settings/reducer';
import menu from './menu/reducer';

import user from './user/reducer';

import contacts from './contacts/reducer';
import placeholders from './placeholder/reducer';
import snippets from './snippets/reducer';
import template from './template/reducer';
import types from './types/reducer';
import smtp from './SMTP/reducer';
import packages from './packages/reducer';
import coupons from './coupons/reducer';

const reducers = combineReducers({
  menu,
  settings,
  user,
  contacts,
  placeholders,
  snippets,
  template,
  types,
  smtp,
  packages,
  coupons,
  account: () => ({ setting: [] })
});

export default reducers;
