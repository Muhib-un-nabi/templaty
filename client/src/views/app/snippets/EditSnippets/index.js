/* eslint-disable prettier/prettier */
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
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { v4 as uuidV4, v4 } from 'uuid';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';

import ControlledInput from '../../../../components/custom/ControlledInput';

import {
  getPlaceholders,
  setLoading as setPlaceholderLoading
} from '../../../../redux/placeholder/action';
import {
  getTypes,
  setLoading as setTypesLoading
} from '../../../../redux/types/action';
import {
  clearCurrent,
  getSnippet,
  updateSnippet,
  setLoading as setSnippetLoading
} from '../../../../redux/snippets/action';

import {
  getInputField,
  setLoading as setContactLoading
} from '../../../../redux/contacts/action';

import habdelGetData from '../../../../helpers/habdelGetData';
import Editor from '../Editor/index';

const index = ({
  match,
  intl,
  history,
  current,
  clearCurrent,
  getPlaceholders,
  placeholders,
  getSnippet,
  updateSnippet,
  setTypesLoading,
  setSnippetLoading,
  setPlaceholderLoading,
  getTypes,
  types,
  inputs: { global, custom },
  placeholderLoading,
  snippetLoading,
  getInputField,
  setContactLoading
}) => {
  const [discription, setDiscription] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [GlobalInput, setGlobalInput] = useState(global);
  const [updateValue, setUpdateValue] = useState(false);
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
    if (!current.name) return;
    const global = GlobalInput.map((ele) => {
      const newObj = JSON.parse(JSON.stringify(ele));
      if (newObj.id === 'name-input') {
        newObj.data.value = current.name;
      }
      if (newObj.id === 'visibility-input') {
        const team = ele.data.options.find((ele) => ele.id === 'team');
        const privat = ele.data.options.find((ele) => ele.id === 'private');
        newObj.data.value = current.visibility ? team : privat;
      }
      return newObj;
    });
    setGlobalInput(global);
    setSelectedOptions(current.category);
    setUpdateValue(true);
    return () => setGlobalInput([]);
  }, [current]);

  useEffect(() => {
    habdelGetData(getPlaceholders, setPlaceholderLoading, history);
    habdelGetData(getTypes, setTypesLoading, history);
    habdelGetData(getInputField, setContactLoading, history);
    getSnippet(match.params.id);
    return () => clearCurrent();
  }, []);

  useEffect(() => {
    setSelectedOptions(current.category);
    setDiscription(current.discription);
  }, [current]);

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
        discription,
        placeholders,
        visibility:
          GlobalInput.find((ele) => ele.id === 'visibility-input').data.value
            .id === 'team'
      };
      await updateSnippet(newSnippet, match.params.id);
      history.push(`${adminRoot}/snippets/all`);
    } catch (e) {
      setSnippetLoading(false);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="form.updateSnippets" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form onSubmit={submitHandler}>
                {updateValue && current && (
                  <>
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
                                data: {
                                  ...inputData.data,
                                  value: updatedValue
                                }
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
                      {(!placeholderLoading && (
                        <Editor
                          value={discription}
                          setValue={setDiscription}
                          placeholderslist={placeholders}
                          contactslist={[...custom, ...global]}
                        />
                      )) || <div>Loading...</div>}
                    </div>
                  </>
                )}
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
                    <IntlMessages id="form.updateSnippets" />
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
  snippets: { current },
  types: { types },
  contacts: { inputs },
  snippets: { loading: snippetLoading }
}) => ({
  current,
  placeholders,
  types,
  inputs,
  placeholderLoading,
  snippetLoading
});

export default connect(mapStateToProps, {
  clearCurrent,
  updateSnippet,
  getTypes,
  getSnippet,
  getPlaceholders,
  setTypesLoading,
  setSnippetLoading,
  setPlaceholderLoading,
  getInputField,
  setContactLoading
})(injectIntl(index));
