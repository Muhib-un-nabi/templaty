/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
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

import ControlledInput from '../../../../components/custom/ControlledInput';
import {
  updateContact,
  getInputField,
  getContact,
  clearCurrent,
  setLoading
} from '../../../../redux/contacts/action';
import habdelGetData from '../../../../helpers/habdelGetData';

const index = ({
  match,
  intl,
  updateContact,
  current,
  getContact,
  clearCurrent,
  history,
  loading,
  setLoading
}) => {
  const [inputs, setInputs] = useState();

  useEffect(() => {
    try {
      setLoading();
      getContact(match.params.id);
    } catch (e) {
      setLoading(false);
    }
    return () => clearCurrent();
  }, []);

  useEffect(() => {
    setInputs(current.data);
  }, [current]);

  // const onChangeHandler = ;
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const newContact = {
        name: inputs.find((ele) => ele.id === 'name-input').data.value,
        data: inputs,
        visibility:
          inputs.find((ele) => ele.id === 'visibility-input').data.value.id ===
          'team'
      };
      await setLoading();
      await updateContact(newContact, match.params.id);
      await clearCurrent();
      history.push(`${adminRoot}/contacts/all`);
    } catch (e) {
      await setLoading(false);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.contacts-edit" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody className={`${loading && 'loading'}`}>
              {!loading && (
                <Form onSubmit={submitHandler}>
                  {inputs &&
                    inputs.length !== 0 &&
                    inputs.map((inputData) => (
                      <FormGroup key={`customInput__${inputData.id}`}>
                        <Label htmlFor={`customInput__${inputData.id}`}>
                          {inputData.data.name}
                        </Label>
                        <ControlledInput
                          inputData={inputData}
                          onChangeHandler={(inputData, updatedValue) =>
                            setInputs((prevState) => {
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

                  <Button
                    color="primary"
                    className={`mt-4 ${
                      loading && 'show-spinner'
                    } btn-shadow btn-multiple-state`}
                    disabled={loading}>
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="form.updateContact" />
                    </span>
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ contacts: { inputs, current, loading } }) => ({
  inputs,
  current,
  loading
});

export default connect(mapStateToProps, {
  updateContact,
  getContact,
  getInputField,
  clearCurrent,
  setLoading
})(injectIntl(index));
