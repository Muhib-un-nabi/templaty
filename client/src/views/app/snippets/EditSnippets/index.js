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
  types
}) => {
  const [Fields, setFields] = useState();
  const [discription, setDiscription] = useState();
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
    getSnippet(match.params.id);
    return () => clearCurrent();
  }, []);

  useEffect(() => {
    setFields(current.data);
    setSelectedOptions(current.category);
    setDiscription(current.discription);
  }, [current]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      let placeholderInSnippet = [
        ...new Set(discription.match(/{{.+?}}/g))
      ].map((ele) => ele.replaceAll('{', '').replaceAll('}', ''));

      placeholderInSnippet = placeholders
        .filter((ele) => placeholderInSnippet.includes(ele.name))
        .map((ele) => ele._id);
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
      await updateSnippet(newSnippet, match.params.id);
      history.push(`${adminRoot}/snippets/all`);
    } catch (e) {
      console.log(e);
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
                {Fields &&
                  Fields.map((inputData) => (
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
                  {(discription && placeholders.length >= 1 && (
                    <Editor
                      value={discription}
                      setValue={setDiscription}
                      list={placeholders}
                    />
                  )) || <div>Loading...</div>}
                </div>

                <Button color="primary" className="mt-4">
                  <IntlMessages id="form.updateSnippets" />
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
  snippets: { current },
  types: { types }
}) => ({
  current,
  placeholders,
  types
});

export default connect(mapStateToProps, {
  clearCurrent,
  updateSnippet,
  getTypes,
  getSnippet,
  getPlaceholders,
  setTypesLoading,
  setSnippetLoading,
  setPlaceholderLoading
})(injectIntl(index));
