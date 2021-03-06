/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
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
import { signup, setLoading } from '../../redux/user/action';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';

const Signup = ({ history, signup, loading, setLoading }) => {
  const [email, setEmail] = useState(`${v4()}@gmail.com`);
  const [password, setPassword] = useState('pass1234');
  const [name, setName] = useState('admin');

  useEffect(() => {
    console.log(loading);
  }, [loading]);

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
      await setLoading();
      await signup(userData);
      history.push(adminRoot);
    } catch (e) {
      await setLoading(false);
    }
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
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
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="lg">
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.register-button" />
                  </span>
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ user: { loading } }) => ({ loading });

export default connect(mapStateToProps, {
  signup,
  setLoading
})(Signup);
