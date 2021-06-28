/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
import {
  SAVE_CONTACT_SETTING,
  ADD_CONTACT,
  GET_CONTACT_SETTING,
  DELETE_CONTACT,
  GET_CONTACTS,
  UPDATE_CONTACT,
  GET_CONTACT,
  CLEAR_CURRENT,
  SET_LOADING
} from './types';

const global = [
  {
    id: 'name-input',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1
    },
    data: {
      key: 'ec099bfc-bf99-4c83-a94d-3a93e45c6043',
      name: 'Name',
      options: [],
      value: ' '
    },
    chosen: false
  },
  {
    id: 'visibility-input',
    type: {
      label: 'Radiobutton',
      value: '3',
      id: 3
    },
    data: {
      key: '1424c193-90d7-4561-9a1b-68c4e3df3c29',
      name: 'Visibility',
      options: [
        {
          id: 'private',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1
          },
          data: {
            key: '90599285-a29e-4091-a58a-b3d78ef8c20b',
            name: 'new Field',
            options: [],
            value: ' '
          },
          chosen: false,
          selected: false,
          label: 'private'
        },
        {
          id: 'team',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1
          },
          data: {
            key: '1090aab7-858c-4b6e-96d4-6324980e2066',
            name: 'new cxzcxfield',
            options: [],
            value: ' '
          },
          chosen: false,
          label: 'team'
        }
      ],
      value: {
        id: 'team',
        type: {
          label: 'Text Area',
          value: '1',
          id: 1
        },
        data: {
          key: '1090aab7-858c-4b6e-96d4-6324980e2066',
          name: 'new cxzcxfield',
          options: [],
          value: ' '
        },
        chosen: false,
        label: 'team'
      }
    },
    chosen: false
  }
];
const contacts = [];
const INITIAL_STATE = {
  inputs: {
    custom: [],
    global
  },
  loading: false,
  contacts,
  current: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONTACT_SETTING:
    case SAVE_CONTACT_SETTING:
      return {
        ...state,
        inputs: { ...state.inputs, custom: [...action.payload] },
        loading: false
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case GET_CONTACT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((ele) => ele._id !== action.payload),
        loading: false
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: {},
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
