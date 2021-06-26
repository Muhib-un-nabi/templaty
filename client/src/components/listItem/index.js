/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Card, Button, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';

const ListItem = ({
  itemData,
  user,
  children,
  deleteClick,
  updateClick,
  rightsToAll = false
}) => {
  const [collapse, setCollapse] = useState(false);
  const rights =
    itemData.user === user._id || user.role === 'admin' || rightsToAll;
  const isAdminItem = itemData.user === user._id && user.role === 'admin';
  return (
    <Card className="d-flex mb-4">
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            Name: <b>{itemData.name}</b>
          </div>
        </div>
        {isAdminItem && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span className="badge badge-light  badge-pill">Personal</span>
            </div>
          </div>
        )}
        {!rightsToAll && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span
                className={`badge badge-${
                  itemData.visibility ? 'primary' : 'secondary'
                } badge-pill`}>
                {itemData.visibility ? 'Team' : 'Private'}
              </span>
            </div>
          </div>
        )}
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          {children && (
            <Button
              outline
              color="theme-3"
              className={`icon-button ml-1 rotate-icon-click ${
                collapse ? 'rotate' : ''
              }`}
              onClick={() => setCollapse(!collapse)}>
              <i className="simple-icon-arrow-down" />
            </Button>
          )}
          {rights && updateClick && (
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1"
              onClick={() => updateClick(itemData)}>
              <i className="simple-icon-pencil" />
            </Button>
          )}
          {rights && deleteClick && (
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1"
              onClick={() => deleteClick(itemData)}>
              <i className="simple-icon-ban" />
            </Button>
          )}
        </div>
      </div>
      {children && (
        <Collapse isOpen={collapse}>
          <div className="card-body pt-0">{children}</div>
        </Collapse>
      )}
    </Card>
  );
};

ListItem.prototype = {
  itemData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteClick: PropTypes.func,
  updateClick: PropTypes.func,
  children: PropTypes.any,
  rightsToAll: PropTypes.bool
};

export default ListItem;
