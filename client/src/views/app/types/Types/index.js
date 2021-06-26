import React, { useEffect, useState } from 'react';
import { Row, Button, Collapse } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from './../../../../containers/navs/Breadcrumb';
import {
  getTypes,
  setLoading,
  deleteType,
  getType
} from '../../../../redux/types/action';
import { ReactSortable } from 'react-sortablejs';

import ListItem from '../../../../components/listItem/index';
import habdelGetData from '../../../../helpers/habdelGetData';

// Add Update Imports
import AddTypes from '../AddTypes/index';
import UpdateTypes from '../UpdateTypes/index';

const Index = ({
  match,
  getTypes,
  getType,
  setLoading,
  deleteType,
  history,
  user,
  types
}) => {
  const [addFromVisible, setAddFromVisible] = useState(false);
  const [updateFromVisible, setUpdateFromVisible] = useState(false);
  const [Types, setTypes] = useState([]);
  useEffect(() => {
    habdelGetData(getTypes, setLoading, history);
  }, []);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('type-order'));
    let orderList;
    if (list) {
      orderList = types.sort((a, b) => {
        return list.indexOf(a._id) - list.indexOf(b._id);
      });
    } else {
      orderList = types;
    }
    setTypes(orderList);
  }, [types]);
  return (
    <>
      <Row>
        <AddTypes visible={addFromVisible} setVisible={setAddFromVisible} />
        <UpdateTypes
          visible={updateFromVisible}
          setVisible={setUpdateFromVisible}
        />
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.types" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => setAddFromVisible(!addFromVisible)}>
                <IntlMessages id="type.add" />
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
              {(types.length === 0 || !user) && <p> No types Found</p>}
              {Types.length !== 0 && (
                <ul className="list-unstyled mb-4">
                  <ReactSortable
                    list={Types}
                    setList={(updatedList) => {
                      setTypes(updatedList);
                      localStorage.setItem(
                        'type-order',
                        JSON.stringify(updatedList.map((ele) => ele._id))
                      );
                    }}>
                    {Types.map((types, i) => (
                      <li data-id={types.id} key={types._id}>
                        <ListItem
                          itemData={types}
                          user={user}
                          rightsToAll={true}
                          deleteClick={({ _id }) => deleteType(_id)}
                          updateClick={({ _id }) => {
                            setLoading();
                            getType(_id);
                            setUpdateFromVisible(true);
                          }}
                        />
                      </li>
                    ))}
                  </ReactSortable>
                </ul>
              )}
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ types: { types }, user: { user } }) => ({
  types,
  user
});

export default connect(mapStateToProps, {
  getTypes,
  setLoading,
  deleteType,
  getType
})(Index);
