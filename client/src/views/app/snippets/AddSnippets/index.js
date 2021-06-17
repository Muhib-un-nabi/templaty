/* eslint-disable prettier/prettier */
/* eslint-disable one-var */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormText,
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  CustomInput,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';

import { v4 as uuidV4, v4 } from 'uuid';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';

import ControlledInput from '../../../../components/custom/ControlledInput';
import { addSnippet } from '../../../../redux/snippets/action';
import { getPlaceholders } from '../../../../redux/placeholder/action';

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const fields = [
  {
    id: 'name-input',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1,
    },
    data: {
      key: 'name',
      name: 'Name',
      options: [],
      value: ' ',
    },
    chosen: false,
  },
  {
    id: '19b9c7de-aa7a-4401-b90a-1fd9f7d83029',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1,
    },
    data: {
      key: 'key',
      name: 'Key',
      options: [],
      value: v4(),
    },
    chosen: false,
  },

  {
    id: 'category',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1,
    },
    data: {
      key: 'category',
      name: 'Category',
      options: [],
      value: ' ',
    },
    chosen: false,
  },
  {
    id: 'visibility-input',
    type: {
      label: 'Radiobutton',
      value: '3',
      id: 3,
    },
    data: {
      key: 'visibility',
      name: 'Visibility',
      options: [
        {
          id: 'team',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1,
          },
          data: {
            key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
            name: 'new Field',
            options: [],
            value: ' ',
          },
          chosen: false,
          selected: false,
          label: 'Team',
        },
        {
          id: 'private',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1,
          },
          data: {
            key: 'dfd98dfe-20b5-40ff-a75d-d0f53f00a094',
            name: 'new cxzcxfield',
            options: [],
            value: ' ',
          },
          chosen: false,
          label: 'Private',
        },
      ],
      value: {
        id: 'team',
        type: {
          label: 'Text Area',
          value: '1',
          id: 1,
        },
        data: {
          key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
          name: 'new Field',
          options: [],
          value: ' ',
        },
        chosen: false,
        selected: false,
        label: 'Team',
      },
    },
    chosen: false,
  },
];

const index = ({
  match,
  intl,
  addSnippet,
  history,
  getPlaceholders,
  placeholders,
}) => {
  const [discription, setDiscription] = useState('');
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);

  const [Fields, setFields] = useState(fields);

  useEffect(() => {
    getPlaceholders();
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const newSnippet = {
        name: Fields.find((ele) => ele.id === 'name-input').data.value,
        category: Fields.find((ele) => ele.id === 'category').data.value.split(
          ','
        ),
        data: Fields,
        discription: discription,
        visibility:
          Fields.find((ele) => ele.id === 'visibility-input').data.value.id ===
          'team',
      };
      console.log(newSnippet);
      await addSnippet(newSnippet);
      history.push(`${adminRoot}/snippets/all`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.snippets-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form onSubmit={submitHandler}>
                {Fields.map((inputData) => (
                  <FormGroup key={`customInput__${inputData.id}`}>
                    <Label htmlFor={`customInput__${inputData.id}`}>
                      {inputData.data.name}
                    </Label>
                    <ControlledInput
                      inputData={inputData}
                      onChangeHandler={(inputData, updatedValue) =>
                        setFields((prevState) => {
                          const newInpuEle = {
                            ...inputData,
                            data: { ...inputData.data, value: updatedValue },
                          };
                          return prevState.map((ele) =>
                            ele.id === newInpuEle.id ? newInpuEle : ele
                          );
                        })
                      }
                    />
                  </FormGroup>
                ))}
                <Card>
                  <Dropdown
                    isOpen={dropdownBasicOpen}
                    toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                    className="mb-5 d-flex justify-content-end"
                  >
                    <DropdownToggle caret color="secondary" outline>
                      <span>Insert Placehoder</span>{' '}
                    </DropdownToggle>
                    <DropdownMenu>
                      {placeholders.map((ele) => (
                        <DropdownItem
                          onClick={() => {
                            setDiscription(
                              `${discription}<b data-id="${ele._id}" class="placeholder">{{${ele.name}}}</b>`
                            );
                          }}
                          key={ele._id}
                        >
                          <span>{ele.name}</span>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <ReactQuill
                    theme="snow"
                    value={discription}
                    onChange={(val) => setDiscription(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Card>
                <Button color="primary" className="mt-4">
                  <IntlMessages id="form.addSnippets" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ placeholders: { placeholders } }) => ({
  placeholders,
});

export default connect(mapStateToProps, { addSnippet, getPlaceholders })(
  injectIntl(index)
);
