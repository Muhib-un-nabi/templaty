import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Alert
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { forgetPassword, setLoading } from '../../redux/user/action';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({ history, loading, forgetPassword }) => {
  const [waitting, setWaitting] = useState(false);
  const [sucessMSG, setSucessMSG] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const [email] = useState('muhib.ataki@gmail.com');

  const onForgotPassword = async (values) => {
    try {
      setSucessMSG(false);
      setErrMsg(false);
      await await setWaitting(true);
      await forgetPassword(values);
      setSucessMSG(true);
    } catch {
      await setWaitting(false);
      setErrMsg(true);
    } finally {
      await setWaitting(false);
      setTimeout(() => {
        setSucessMSG(false);
        setErrMsg(false);
      }, 5000);
    }
  };

  const initialValues = { email };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
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
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
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
                  {sucessMSG && (
                    <Alert color="success">
                      <IntlMessages id="alert.success-forget-pass-msg" />
                    </Alert>
                  )}
                  {errMsg && (
                    <Alert color="danger">
                      <IntlMessages id="alert.fail-forget-pass-msg" />
                    </Alert>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/register">
                      <IntlMessages id="user.register-password-question" />
                    </NavLink>
                    <Button
                      disabled={waitting}
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        waitting ? 'show-spinner' : ''
                      }`}
                      size="lg">
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
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

export default connect(mapStateToProps, { forgetPassword })(ForgotPassword);
