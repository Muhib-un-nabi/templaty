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
import Select from 'react-select';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import habdelGetData from '../../../../helpers/habdelGetData';
import ControlledInput from '../../../../components/custom/ControlledInput';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import {
  getTypes,
  setLoading as setTypesLoading
} from '../../../../redux/types/action';
import {
  addPlaceholder,
  setLoading as setPlaceholderLoading
} from '../../../../redux/placeholder/action';

const index = ({
  intl,
  match,
  history,
  types,
  loading,
  inputs: { global },
  addPlaceholder,
  setPlaceholderLoading,
  getTypes,
  setTypesLoading
}) => {
  const [GlobalInput, setGlobalInput] = useState(global);
  const [key, setKey] = useState('');
  const [value, setvalue] = useState('');
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
    habdelGetData(getTypes, setTypesLoading, history);
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setPlaceholderLoading();
      const newPlaceholders = {
        name: GlobalInput.find((ele) => ele.id === 'name-input').data.value,
        key: genrateKey(),
        defaultValue: value,
        visibility:
          GlobalInput.find((ele) => ele.id === 'visibility-input').data.value
            .id === 'team',
        category: selectedOptions
      };
      await addPlaceholder(newPlaceholders);
      setPlaceholderLoading(false);

      history.push(`${adminRoot}/placeholders/all`);
    } catch (e) {
      setPlaceholderLoading(false);
    }
  };

  const makeKey = (string) => {
    return string.toString().toLocaleLowerCase().replaceAll(' ', '-');
  };
  const genrateKey = () => {
    return (
      makeKey(key) ||
      makeKey(GlobalInput.find((ele) => ele.id === 'name-input').data.value)
    );
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.placeholders-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form onSubmit={submitHandler}>
                {!loading &&
                  GlobalInput.map((inputData) => (
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
                <FormGroup>
                  <Label>Key</Label>
                  <Input
                    type="text"
                    value={genrateKey()}
                    name="key"
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Value (default)</Label>
                  <Input
                    type="text"
                    value={value}
                    name="value"
                    onChange={(e) => {
                      setvalue(e.target.value);
                    }}
                  />
                </FormGroup>
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
                <Button
                  disabled={loading}
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="sm">
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="form.addPlaceholder" />
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
  contacts: { inputs },
  types: { types, loading }
}) => ({
  inputs,
  types,
  loading
});

export default connect(mapStateToProps, {
  addPlaceholder,
  getTypes,
  setTypesLoading,
  setPlaceholderLoading
})(injectIntl(index));
