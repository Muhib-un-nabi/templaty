/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Card, Button } from 'reactstrap';

const TemplateItem = ({ itemData, user, deleteClick, loadTemplate }) => {
  return (
    <Card className={`key d-flex mb-4 `}>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
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
              } badge-pill`}>
              {itemData.visibility ? 'Team' : 'Private'}
            </span>
          </div>
        </div>
        {itemData.category && itemData.category[0].trim() !== '' && (
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div className="w-15 w-xs-100">
              <span className="badge badge-primary   badge-pill">
                {itemData.category.join(' , ')}
              </span>
            </div>
          </div>
        )}
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          <Button
            outline
            color="theme-3"
            className="icon-button ml-1"
            onClick={() =>
              loadTemplate({
                snippets: itemData.snippets,
                placeholders: itemData.placeholders
              })
            }>
            <i className="simple-icon-arrow-down-circle" />
          </Button>

          {(itemData.user === user._id || user.role === 'admin') && (
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1"
              onClick={() => deleteClick(itemData._id)}>
              <i className="simple-icon-ban" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TemplateItem;
