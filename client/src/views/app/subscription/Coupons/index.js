/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Button, Collapse } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';

import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';

import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { rolse, adminRoot } from '../../../../constants/defaultValues';

import {
  getCoupon,
  getCoupons,
  setLoading,
  deleteCoupon
} from '../../../../redux/coupons/action';

import ListItem from '../../../../components/listItem/index';
import habdelGetData from '../../../../helpers/habdelGetData';

// Add Update Imports
import AddCoupons from '../AddCoupons/index';
import UpdateCoupons from '../UpdateCoupons/index';

const Index = ({
  match,
  history,

  // Get Data From Redux
  user,
  coupons,

  // Actions
  getCoupon,
  getCoupons,
  setLoading,
  deleteCoupon
}) => {
  const [addFromVisible, setAddFromVisible] = useState(false);
  const [updateFromVisible, setUpdateFromVisible] = useState(false);
  useEffect(() => {
    habdelGetData(getCoupons, setLoading, history);
  }, []);

  useEffect(() => {
    if (user && user.role && user.role !== rolse.superAdmin) {
      history.push(adminRoot);
    }
  }, [user]);

  return (
    <>
      <Row>
        <AddCoupons visible={addFromVisible} setVisible={setAddFromVisible} />
        {/* <UpdateCoupons
          visible={updateFromVisible}
          setVisible={setUpdateFromVisible}
        /> */}
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.coupons" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => setAddFromVisible(!addFromVisible)}>
                <IntlMessages id="coupon.add" />
              </Button>
            </div>
            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => {
                // setDisplayOptionsIsOpen(!displayOptionsIsOpen);
              }}>
              <IntlMessages id="display-options" />
              <i className="simple-icon-arrow-down align-middle" />
            </Button>

            <Collapse id="displayOptions" className="d-md-block mb-2">
              <div className="d-block d-md-inline-block"></div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" className="mb-4">
              {(coupons.length === 0 || !user) && <p> No coupons Found</p>}
              {coupons.length !== 0 && (
                <ul className="list-unstyled mb-4">
                  {coupons.map((coupons) => (
                    <li data-id={coupons.id} key={coupons._id}>
                      <ListItem
                        itemData={coupons}
                        name={coupons.name}
                        user={user}
                        rightsToAll={true}
                        // deleteClick={({ _id }) => deleteCoupon(_id)}
                        updateClick={({ _id }) => {
                          setLoading();
                          getCoupon(_id);
                          setUpdateFromVisible(true);
                        }}>
                        hellol
                      </ListItem>
                    </li>
                  ))}
                </ul>
              )}
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ coupons: { coupons }, user: { user } }) => ({
  coupons,
  user
});

export default connect(mapStateToProps, {
  getCoupon,
  getCoupons,
  setLoading,
  deleteCoupon
})(Index);
