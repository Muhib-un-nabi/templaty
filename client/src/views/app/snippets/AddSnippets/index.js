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
  FormGroup,
  Form,
  Label,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';

import { v4 } from 'uuid';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { injectIntl } from 'react-intl';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Select from 'react-select';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import ControlledInput from '../../../../components/custom/ControlledInput';
import {
  addSnippet,
  setLoading as setSnippetLoading
} from '../../../../redux/snippets/action';
import {
  getTypes,
  setLoading as setTypesLoading
} from '../../../../redux/types/action';
import {
  getPlaceholders,
  setLoading as setPlaceholderLoading
} from '../../../../redux/placeholder/action';
import habdelGetData from '../../../../helpers/habdelGetData';
import Editor from '../Editor/index';

const fields = [
  {
    id: 'name-input',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1
    },
    data: {
      key: 'name',
      name: 'Name',
      options: [],
      value: ' '
    },
    chosen: false
  },
  {
    id: '19b9c7de-aa7a-4401-b90a-1fd9f7d83029',
    type: {
      label: 'Text Area',
      value: '1',
      id: 1
    },
    data: {
      key: 'key',
      name: 'Key',
      options: [],
      value: v4()
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
      key: 'visibility',
      name: 'Visibility',
      options: [
        {
          id: 'team',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1
          },
          data: {
            key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
            name: 'new Field',
            options: [],
            value: ' '
          },
          chosen: false,
          selected: false,
          label: 'Team'
        },
        {
          id: 'private',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1
          },
          data: {
            key: 'dfd98dfe-20b5-40ff-a75d-d0f53f00a094',
            name: 'new cxzcxfield',
            options: [],
            value: ' '
          },
          chosen: false,
          label: 'Private'
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
          key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
          name: 'new Field',
          options: [],
          value: ' '
        },
        chosen: false,
        selected: false,
        label: 'Team'
      }
    },
    chosen: false
  }
];

const index = ({
  getPlaceholders,
  placeholders,
  match,
  intl,
  addSnippet,
  history,
  getTypes,
  setSnippetLoading,
  setTypesLoading,
  setPlaceholderLoading,
  types
}) => {
  const [discription, setDiscription] = useState('');
  const [Fields, setFields] = useState(fields);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectData = () => {
    return (
      types.map(({ _id, name }) => ({
        label: name,
        value: name,
        key: _id
      })) || []
    );
  };
  useEffect(() => {
    habdelGetData(getPlaceholders, setPlaceholderLoading, history);
    habdelGetData(getTypes, setTypesLoading, history);
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      let placeholderInSnippet = [
        ...new Set(discription.match(/{{.+?}}/g))
      ].map((ele) => ele.replaceAll('{', '').replaceAll('}', ''));

      placeholderInSnippet = placeholders
        .filter((ele) => placeholderInSnippet.includes(ele.name))
        .map((ele) => ele._id);
      console.log(selectedOptions);
      const newSnippet = {
        name: Fields.find((ele) => ele.id === 'name-input').data.value,
        category: selectedOptions,
        data: Fields,
        discription: discription,
        placeholders: placeholderInSnippet,
        visibility:
          Fields.find((ele) => ele.id === 'visibility-input').data.value.id ===
          'team'
      };

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
                            data: { ...inputData.data, value: updatedValue }
                          };
                          return prevState.map((ele) =>
                            ele.id === newInpuEle.id ? newInpuEle : ele
                          );
                        })
                      }
                    />
                  </FormGroup>
                ))}
                <FormGroup>
                  <label>
                    <IntlMessages id="type.select" />
                  </label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti
                    name="form-field-name"
                    value={selectedOptions}
                    onChange={setSelectedOptions}
                    options={selectData()}
                  />
                </FormGroup>
                <div>
                  {(placeholders.length >= 1 && (
                    <Editor
                      value={discription}
                      setValue={setDiscription}
                      list={placeholders}
                    />
                  )) || <div>Loading...</div>}
                </div>

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

const mapStateToProps = ({
  placeholders: { placeholders },
  types: { types }
}) => ({
  placeholders,
  types
});

export default connect(mapStateToProps, {
  addSnippet,
  getTypes,
  getPlaceholders,
  setSnippetLoading,
  setTypesLoading,
  setPlaceholderLoading
})(injectIntl(index));
