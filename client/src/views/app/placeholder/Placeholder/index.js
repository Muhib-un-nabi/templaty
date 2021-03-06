/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Row, Button, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import {
  getPlaceholders,
  deletePlaceholder
} from '../../../../redux/placeholder/action';
import ListItem from '../../../../components/listItem/index';

const Placeholders = ({
  match,
  history,
  getPlaceholders,
  deletePlaceholder,
  placeholders,
  user
}) => {
  const [Placeholders, setPlaceholders] = useState(placeholders);

  useEffect(() => {
    getPlaceholders();
  }, []);

  useEffect(() => {
    setPlaceholders(placeholders);
  }, [placeholders]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.placeholders" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => history.push(`${adminRoot}/placeholders/add`)}>
                <IntlMessages id="menu.placeholders-add" />
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
              <div className="d-block d-md-inline-block">
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    onChange={(e) => {
                      if (e.target.value.trim() === '') {
                        return setPlaceholders(placeholders);
                      }
                      const filteredItem = Placeholders.filter((ele) => {
                        return ele.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase());
                      });
                      setPlaceholders(filteredItem);
                    }}
                    // placeholder={messages['menu.search']}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" className="mb-4">
              {Placeholders.length === 0 && <p> No Placeholders Found</p>}
              <ul className="list-unstyled mb-4">
                {Placeholders.map((placeholder, i) => (
                  <li key={placeholder._id}>
                    <ListItem
                      itemData={placeholder}
                      user={user}
                      deleteClick={({ _id }) => deletePlaceholder(_id)}
                      updateClick={({ _id }) =>
                        history.push(`${adminRoot}/placeholders/edit/${_id}`)
                      }
                    />
                  </li>
                ))}
              </ul>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({
  placeholders: { placeholders },
  user: { user }
}) => ({
  placeholders,
  user
});

export default connect(mapStateToProps, { deletePlaceholder, getPlaceholders })(
  Placeholders
);
