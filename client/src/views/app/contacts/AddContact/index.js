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
import { v4 as uuidV4 } from 'uuid';

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
import {
  addContact,
  getInputField,
  setLoading
} from '../../../../redux/contacts/action';

const index = ({
  inputs: { custom, global },
  match,
  intl,
  addContact,
  getInputField,
  history,
  loading,
  setLoading
}) => {
  const [GlobalInput, setGlobalInput] = useState(global);
  const [customInput, setCustomInput] = useState(custom);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setCustomInput(custom);
  }, [custom]);
  useEffect(() => {
    habdelGetData(getInputField, setLoading, history);
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await setLoading();
      const newContact = {
        name: GlobalInput.find((ele) => ele.id === 'name-input').data.value,
        email: email,
        data: customInput.map((ele) => ({
          name: ele.data.name,
          value: ele.data.value,
          type: ele.type
        })),
        visibility:
          GlobalInput.find((ele) => ele.id === 'visibility-input').data.value
            .id === 'team'
      };
      await addContact(newContact);
      history.push(`${adminRoot}/contacts/all`);
    } catch (e) {
      await setLoading(false);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.contacts-add" match={match} />
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
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required></Input>
                </FormGroup>
                {(!loading &&
                  customInput.map((inputData) => (
                    <FormGroup key={`customInput__${inputData.id}`}>
                      <Label htmlFor={`customInput__${inputData.id}`}>
                        {inputData.data.name}
                      </Label>
                      <ControlledInput
                        inputData={inputData}
                        onChangeHandler={(inputData, updatedValue) =>
                          setCustomInput((prevState) => {
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
                  ))) || <div className="loading"></div>}
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
                    <IntlMessages id="form.addContact" />
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

const mapStateToProps = ({ contacts: { inputs, loading } }) => ({
  inputs,
  loading
});

export default connect(mapStateToProps, {
  addContact,
  getInputField,
  setLoading
})(injectIntl(index));
