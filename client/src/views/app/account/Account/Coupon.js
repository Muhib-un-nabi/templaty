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

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Input,
  CardHeader,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import {
  checkCouponValidation,
  setLoading
} from '../../../../redux/user/action';

import IntlMessages from '../../../../helpers/IntlMessages';

const Coupon = ({
  intl,
  match,
  history,
  // Redux Data
  loading,
  // Redux ACtion

  checkCouponValidation,
  setLoading
}) => {
  // const { messages } = intl;
  const [coupon, setCoupon] = useState('');
  const [validCoupon, setvalidCoupon] = useState(false);

  const validateCoupon = async (e) => {
    try {
      e.preventDefault();
      setLoading();
      await checkCouponValidation(coupon);
    } catch {
      setvalidCoupon(false);
      console.log('invalid Coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id="coupon" />
          </h1>
        </div>
      </Colxx>
      <Colxx>
        <Form onSubmit={validateCoupon}>
          <div className="mb-4 d-flex justify-content-between">
            <FormGroup className="w-80">
              <Input
                // className="invalid"
                value={coupon}
                // valid={validCoupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </FormGroup>
            <div className="w-5">
              <Button
                disabled={loading}
                color="primary"
                className={`btn-shadow  btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="lg">
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="coupon.apply" />
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Colxx>
    </>
  );
};

const mapStateToProps = ({ user: { coupon, loading } }) => ({
  coupon,
  loading
});

export default connect(mapStateToProps, { checkCouponValidation, setLoading })(
  injectIntl(Coupon)
);
