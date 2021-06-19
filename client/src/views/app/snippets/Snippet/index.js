/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import { getSnippets, deleteSnippet } from '../../../../redux/snippets/action';
import SnippetsItem from './SnippetsItem';

const Placeholders = ({
  match,
  history,
  getSnippets,
  deleteSnippet,
  snippets,
  user
}) => {
  const [Snippets, setSnippets] = useState(snippets);

  useEffect(() => {
    getSnippets();
  }, []);

  useEffect(() => {
    setSnippets(snippets);
  }, [snippets]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.snippets" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => history.push(`${adminRoot}/snippets/add`)}>
                <IntlMessages id="menu.snippets-add" />
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
                        return setSnippets(snippets);
                      }
                      const filteredItem = snippets.filter((ele) => {
                        return ele.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase());
                      });
                      setSnippets(filteredItem);
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
              {(Snippets.length === 0 || !user) && <p> No Snippets Found</p>}
              <ul className="list-unstyled mb-4">
                {user &&
                  Snippets.map((snippet, i) => (
                    <li key={snippet._id}>
                      <SnippetsItem
                        user={user}
                        itemData={snippet}
                        order={i}
                        deleteClick={(id) => deleteSnippet(id)}
                        updateClick={(id) =>
                          history.push(`${adminRoot}/snippets/edit/${id}`)
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

const mapStateToProps = ({ snippets: { snippets }, user: { user } }) => ({
  snippets,
  user
});

export default connect(mapStateToProps, { getSnippets, deleteSnippet })(
  Placeholders
);
