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
  getPackage,
  getPackages,
  setLoading,
  deletePackage
} from '../../../../redux/packages/action';

import ListItem from '../../../../components/listItem/index';
import habdelGetData from '../../../../helpers/habdelGetData';

// Add Update Imports
import AddPackages from '../AddPackages/index';
import UpdatePackages from '../UpdatePackages/index';

const Index = ({
  match,
  history,

  // Get Data From Redux
  user,
  packages,

  // Actions
  getPackage,
  getPackages,
  setLoading,
  deletePackage
}) => {
  const [addFromVisible, setAddFromVisible] = useState(false);
  const [updateFromVisible, setUpdateFromVisible] = useState(false);
  useEffect(() => {
    habdelGetData(getPackages, setLoading, history);
  }, []);

  useEffect(() => {
    if (user && user.role && user.role !== rolse.superAdmin) {
      history.push(adminRoot);
    }
  }, [user]);

  return (
    <>
      <Row>
        <AddPackages visible={addFromVisible} setVisible={setAddFromVisible} />
        {/* <UpdatePackages
          visible={updateFromVisible}
          setVisible={setUpdateFromVisible}
        /> */}
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.packages" />
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
              {(packages.length === 0 || !user) && <p> No packages Found</p>}
              {packages.length !== 0 && (
                <ul className="list-unstyled mb-4">
                  {packages.map((packages) => (
                    <li data-id={packages.id} key={packages._id}>
                      <ListItem
                        itemData={packages}
                        name={packages.name}
                        user={user}
                        rightsToAll={true}
                        deleteClick={({ _id }) => deletePackage(_id)}
                        updateClick={({ _id }) => {
                          setLoading();
                          getPackage(_id);
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

const mapStateToProps = ({ packages: { packages }, user: { user } }) => ({
  packages,
  user
});

export default connect(mapStateToProps, {
  getPackage,
  getPackages,
  setLoading,
  deletePackage
})(Index);
