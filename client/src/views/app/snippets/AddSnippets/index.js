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
import {
  getInputField,
  setLoading as setContactLoading
} from '../../../../redux/contacts/action';
import habdelGetData from '../../../../helpers/habdelGetData';
import Editor from '../Editor/index';

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
  types,
  inputs: { custom, global },
  placeholderLoading,
  typesLoading,
  snippetLoading,
  getInputField,
  setContactLoading,
  contactLoading
}) => {
  const [discription, setDiscription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [GlobalInput, setGlobalInput] = useState(global);
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
    habdelGetData(getInputField, setContactLoading, history);
    setSnippetLoading(false);
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setSnippetLoading();
      const discriptionHtml = new DOMParser().parseFromString(
        discription,
        'text/html'
      );
      const placeholders = [
        ...new Set(
          [...discriptionHtml.querySelectorAll('placeholder')].map(
            (ele) => ele.dataset._id
          )
        )
      ];
      const newSnippet = {
        name: GlobalInput.find((ele) => ele.id === 'name-input').data.value,
        category: selectedOptions,
        discription: discription,
        placeholders,
        visibility:
          GlobalInput.find((ele) => ele.id === 'visibility-input').data.value
            .id === 'team'
      };

      await addSnippet(newSnippet);
      history.push(`${adminRoot}/snippets/all`);
    } catch (e) {
      setSnippetLoading(false);
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
                {GlobalInput.map((inputData) => (
                  <FormGroup key={`customInput__${inputData.id}`}>
                    <Label htmlFor={`customInput__${inputData.id}`}>
                      {inputData.data.name}
                    </Label>
                    <ControlledInput
                      inputData={inputData}
                      onChangeHandler={(inputData, updatedValue) =>
                        setGlobalInput((prevState) => {
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
                {!typesLoading && (
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
                )}
                <div>
                  {(!placeholderLoading && !contactLoading && (
                    <Editor
                      value={discription}
                      setValue={setDiscription}
                      placeholderslist={placeholders}
                      contactslist={custom}
                    />
                  )) || <div>Loading...</div>}
                </div>

                <Button
                  disabled={snippetLoading}
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${
                    snippetLoading ? 'show-spinner' : ''
                  }`}
                  size="sm">
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="form.addSnippets" />
                  </span>
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
  placeholders: { placeholders, loading: placeholderLoading },
  types: { types, loading: typesLoading },
  contacts: { inputs, loading: contactLoading },
  snippets: { loading: snippetLoading }
}) => ({
  inputs,
  placeholders,
  types,
  placeholderLoading,
  typesLoading,
  snippetLoading,
  contactLoading
});

export default connect(mapStateToProps, {
  addSnippet,
  getTypes,
  getPlaceholders,
  setSnippetLoading,
  setTypesLoading,
  setPlaceholderLoading,
  getInputField,
  setContactLoading
})(injectIntl(index));
