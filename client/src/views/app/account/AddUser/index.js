/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { addNewUser, setLoading } from '../../../../redux/user/action';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { adminRoot } from '../../../../constants/defaultValues';

const AddNewUser = ({ match, history, addNewUser, setLoading, loading }) => {
  const [email, setEmail] = useState(`${v4()}@gmail.com`);
  const [password, setPassword] = useState('pass1234');
  const [name, setName] = useState(`Ali ${Math.round(Math.random() * 99)}`);

  const onUserRegister = async (e) => {
    e.preventDefault();
    if (!email && !password) return;
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: password,
        role: 'admin'
      };
      setLoading();
      await addNewUser(userData);
      history.push(`${adminRoot}/account`);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.add-user" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="p-5">
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id="menu.add-user" />
              </CardTitle>
              <Form onSubmit={onUserRegister}>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Input
                    type="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.email" />
                  </Label>
                  <Input
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.password" />
                  </Label>
                  <Input
                    defaultValue={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    disabled={loading}
                    color="primary"
                    className={`btn-shadow mt-4 btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    size="lg">
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="button.user-add" />
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ user: { loading } }) => ({ loading });

export default connect(mapStateToProps, { addNewUser, setLoading })(AddNewUser);
