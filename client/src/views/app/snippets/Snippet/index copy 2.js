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
  getSnippets,
  deleteSnippet,
  setLoading
} from '../../../../redux/snippets/action';
import habdelGetData from '../../../../helpers/habdelGetData';

import SnippetsItem from './SnippetsItem';
import ListItem from '../../../../components/listItem/index';
import SurveyApplicationMenu from './SurveyApplicationMenu';

const Placeholders = ({
  match,
  history,

  snippets,
  user,
  loading,

  getSnippets,
  deleteSnippet,
  setLoading
}) => {
  const [Snippets, setSnippets] = useState(snippets);

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  useEffect(() => {
    habdelGetData(getSnippets, setLoading, history);
  }, []);

  useEffect(() => {
    setSnippets(snippets);
  }, [snippets]);

  return (
    <>
      <Row className="app-row ">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.snippets" />
            </h1>

            {!loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setModalOpen(true)}>
                  <IntlMessages id="survey.add-new" />
                </Button>
                <ButtonDropdown
                  isOpen={dropdownSplitOpen}
                  toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}>
                  <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      // checked={selectedItems.length >= surveyItems.length}
                      // onClick={() => handleChangeSelectAll()}
                      // onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                        // className={`custom-control-label ${
                        //   selectedItems.length > 0 &&
                        //   selectedItems.length < surveyItems.length
                        //     ? 'indeterminate'
                        //     : ''
                        // }`}
                        />
                      }
                    />
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split btn-lg"
                  />
                  <DropdownMenu right>
                    <DropdownItem>
                      <IntlMessages id="survey.delete" />
                    </DropdownItem>
                    <DropdownItem>
                      <IntlMessages id="survey.another-action" />
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            )}

            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => {
                setDisplayOptionsIsOpen(!displayOptionsIsOpen);
              }}>
              <IntlMessages id="survey.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>

            <Collapse
              id="displayOptions"
              className="d-md-block mb-2"
              isOpen={displayOptionsIsOpen}>
              <div className="d-block d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="survey.orderby" />
                    {/* {orderColumn ? orderColumn.label : ''} */}
                  </DropdownToggle>
                  <DropdownMenu>
                    {/* {orderColumns.map((o, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() =>
                            getSurveyListWithOrderAction(o.column)
                          }>
                          {o.label}
                        </DropdownItem>
                      );
                    })} */}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    // placeholder={messages['menu.search']}
                    // defaultValue={searchKeyword}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // getSurveyListSearchAction(e.target.value);
                      }
                    }}
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
                      <ListItem
                        itemData={snippet}
                        user={user}
                        deleteClick={({ _id }) => deleteSnippet(_id)}
                        updateClick={({ _id }) =>
                          history.push(`${adminRoot}/snippets/edit/${_id}`)
                        }>
                        <SnippetsItem itemData={snippet} />
                      </ListItem>
                    </li>
                  ))}
              </ul>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      {!loading && <SurveyApplicationMenu />}
    </>
  );
};

const mapStateToProps = ({
  snippets: { snippets, loading },
  user: { user }
}) => ({
  snippets,
  user,
  loading
});

export default connect(mapStateToProps, {
  getSnippets,
  deleteSnippet,
  setLoading
})(Placeholders);
