/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Card, Button, Collapse, FormGroup, Label } from 'reactstrap';

const PlaceholdersItem = ({
  itemData,
  deleteClick,
  updateClick,
  order,
  user,
}) => {
  // return null;
  const renderValue = (element) => {
    switch (element.type.id) {
      case 1:
        return <b>{element.data.value}</b>;
      case 2:
        return (
          <b>
            {element.data.value.map((ele) => (
              <span key={ele.id}> {ele.label} ,</span>
            ))}
          </b>
        );
      case 3:
        return <b>{element.data.value.label}</b>;
      default:
        return null;
    }
  };

  return (
    <Card className={`key d-flex mb-4 `}>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            <span className="heading-number d-inline-block">{order + 1}</span>
            Name: <b>{itemData.name}</b>
          </div>
        </div>
        {itemData.user === user._id && user.role === 'admin' && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span className="badge badge-light  badge-pill">Personal</span>
            </div>
          </div>
        )}
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          <div className="w-15 w-xs-100">
            <span
              className={`badge badge-${
                itemData.visibility ? 'primary' : 'secondary'
              } badge-pill`}
            >
              {itemData.visibility ? 'Team' : 'Private'}
            </span>
          </div>
        </div>
        {itemData.category.length >= 2 && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span className="badge badge-primary   badge-pill">
                {itemData.category.join(' , ')}
              </span>
            </div>
          </div>
        )}
        {(itemData.user === user._id || user.role === 'admin') && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1"
              onClick={() => updateClick(itemData._id)}
            >
              <i className="simple-icon-pencil" />
            </Button>
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1"
              onClick={() => deleteClick(itemData._id)}
            >
              <i className="simple-icon-ban" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
export default PlaceholdersItem;
