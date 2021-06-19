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
import {
  deleteContact,
  getContacts,
  setLoading
} from '../../../../redux/contacts/action';
import ContactItem from './ContactItem';
import habdelGetData from '../../../../helpers/habdelGetData';

const Contacts = ({
  match,
  history,
  contacts,
  user,
  deleteContact,
  getContacts,
  loading,
  setLoading
}) => {
  const [Contacts, setContacts] = useState(contacts);

  useEffect(() => {
    habdelGetData(getContacts, setLoading, history);
  }, []);

  useEffect(() => {
    setContacts(contacts);
  }, [contacts]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.contacts" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => history.push(`${adminRoot}/contacts/add`)}>
                <IntlMessages id="menu.contacts-add" />
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
                        return setContacts(contacts);
                      }
                      const filteredItem = Contacts.filter((ele) => {
                        return ele.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase());
                      });
                      setContacts(filteredItem);
                    }}
                    // placeholder={messages['menu.search']}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" className={`mb-4 ${loading && ''}`}>
              {Contacts.length === 0 && <p> No Contacts Found</p>}

              <ul className="list-unstyled mb-4">
                {Contacts.map((contact, i) => (
                  <li key={contact._id}>
                    <ContactItem
                      itemData={contact}
                      order={i}
                      user={user}
                      deleteClick={(id) => deleteContact(id)}
                      updateClick={(id) =>
                        history.push(`${adminRoot}/contacts/edit/${id}`)
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
  contacts: { contacts },
  user: { user, loading }
}) => ({
  contacts,
  user,
  loading
});

export default connect(mapStateToProps, {
  deleteContact,
  getContacts,
  setLoading
})(Contacts);
