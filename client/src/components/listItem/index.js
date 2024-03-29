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

import { connect } from 'react-redux';

const ListItem = ({
  itemData,
  user,
  children,
  deleteClick,
  updateClick,
  rightsToAll = false,
  name,
  tags = true,
  team
}) => {
  const [isTeam, setIsTeam] = useState(true);
  useState(() => {
    if (team && team.package && isTeam) {
      setIsTeam(team.package.team);
    }
  }, [team]);

  const [collapse, setCollapse] = useState(false);
  const rights =
    itemData.user === user._id || user.role === 'admin' || rightsToAll;
  const isAdminItem =
    itemData.user === user._id && user.role === 'admin' && isTeam;
  const renderName = () => {
    if (name) {
      return <b>{name}</b>;
    } else {
      return (
        <>
          Name: <b>{itemData.name}</b>
        </>
      );
    }
  };
  return (
    <Card className="d-flex mb-4">
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center py-3">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            {renderName()}
          </div>
        </div>
        {tags && isAdminItem && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span className="badge badge-light  badge-pill">Personal</span>
            </div>
          </div>
        )}
        {tags && !rightsToAll && isTeam && (
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
              <i className="simple-icon-trash" />
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

const mapStateToProps = ({ user: { team } }) => ({
  team
});

export default connect(mapStateToProps)(ListItem);
