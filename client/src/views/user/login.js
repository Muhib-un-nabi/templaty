/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { adminRoot } from '../../constants/defaultValues';

import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { login, setLoading } from '../../redux/user/action';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading = false, error = [], login, setLoading }) => {
  const [email] = useState('admin@gmail.com');
  const [password] = useState('pass1234');

  const onUserLogin = async (values) => {
    if (!values.email && !values.password) return;
    try {
      await setLoading();
      await login(values);
      history.push(adminRoot);
    } catch (e) {
      await setLoading(false);
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <IntlMessages id="or" />
                    <NavLink to="/user/register">
                      <IntlMessages id="user.create-account" />
                    </NavLink>
                    <Button
                      color="primary"
                      disabled={loading}
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
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ user: { loading } }) => ({ loading });

export default connect(mapStateToProps, {
  login,
  setLoading
})(Login);
