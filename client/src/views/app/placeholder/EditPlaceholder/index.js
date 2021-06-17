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
import { v4 as uuidV4, v4 } from 'uuid';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';

import ControlledInput from '../../../../components/custom/ControlledInput';
import {
  getPlaceholder,
  updatePlaceholder,
  clearCurrent,
} from '../../../../redux/placeholder/action';

const index = ({
  match,
  intl,
  history,
  getPlaceholder,
  updatePlaceholder,
  current,
  clearCurrent,
}) => {
  const [Fields, setFields] = useState('');

  useEffect(() => {
    getPlaceholder(match.params.id);
    return () => clearCurrent();
  }, []);

  useEffect(() => {
    setFields(current.data);
  }, [current]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const newPlaceholders = {
        name: Fields.find((ele) => ele.id === 'name-input').data.value,
        category: Fields.find((ele) => ele.id === 'category').data.value.split(
          ','
        ),
        data: Fields,
        visibility:
          Fields.find((ele) => ele.id === 'visibility-input').data.value.id ===
          'team',
      };
      await updatePlaceholder(newPlaceholders, match.params.id);
      await clearCurrent();
      history.push(`${adminRoot}/placeholders/all`);
    } catch (e) {
      console.log(e);
    }
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
                  <IntlMessages id="form.editPlaceholder" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ placeholders: { current } }) => ({
  current,
});

export default connect(mapStateToProps, {
  getPlaceholder,
  updatePlaceholder,
  clearCurrent,
})(injectIntl(index));
