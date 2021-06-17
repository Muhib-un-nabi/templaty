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
  CustomInput,
} from 'reactstrap';
import { connect } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';

import ControlledInput from '../../../../components/custom/ControlledInput';
import { addContact, getInputField } from '../../../../redux/contacts/action';

const index = ({
  inputs: { custom, global },
  match,
  intl,
  addContact,
  getInputField,
  history,
}) => {
  const [GlobalInput, setGlobalInput] = useState(global);
  const [customInput, setCustomInput] = useState(custom);

  useEffect(() => {
    setCustomInput(custom);
  }, [custom]);
  useEffect(() => {
    getInputField();
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const newContact = {
        name: GlobalInput.find((ele) => ele.id === 'name-input').data.value,
        data: [...GlobalInput, ...customInput],
        visibility:
          GlobalInput.find((ele) => ele.id === 'visibility-input').data.value
            .id === 'team',
      };
      await addContact(newContact);
      history.push(`${adminRoot}/contacts/all`);
    } catch (e) {
      console.log(e);
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
                {customInput.map((inputData) => (
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
                <Button color="primary" className="mt-4">
                  <IntlMessages id="form.addContact" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ contacts: { inputs } }) => ({
  inputs,
});

export default connect(mapStateToProps, { addContact, getInputField })(
  injectIntl(index)
);
