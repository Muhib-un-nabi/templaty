import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';

import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import habdelGetData from '../../../../helpers/habdelGetData';

import {
  getSnippets,
  setLoading as setSnippetLoading
} from '../../../../redux/snippets/action';
import {
  getTypes,
  setLoading as setTypeLoading
} from '../../../../redux/types/action';
import {
  getContacts,
  getInputField,
  setLoading as setContactsLoading
} from '../../../../redux/contacts/action';

import {
  CHECKBOX,
  RADIO_BUTTON,
  TEXT_AREA
} from '../../../../constants/inputTypes';

import SnippetsGroups from './SnippetsGroups';
import InputItems from './InputItems';
import LivePreview from './livePreview';

import HandelTemplate from '../handelTemplate/index';
import AddTemplate from '../handelTemplate/addTemplate';

const Template = ({
  match,
  getSnippets,
  setSnippetLoading,
  history,
  snippets,
  loading,
  user,
  getTypes,
  setTypeLoading,
  types,
  getContacts,
  getInputField,
  setContactsLoading,
  contacts,
  inputs: { custom }
}) => {
  const [items, setItems] = useState([]);
  const [debugPlaceholders, setDebugPlaceholders] = useState(true);
  const snippetHrmlRef = useRef();

  const [placeholders, setPlaceholders] = useState();
  const [isupdatePlaceholder, setIsupdatePlaceholder] = useState(true);

  const [inputItems, setInputItems] = useState([]);

  const [modal, setModal] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [loadTemplateData, setLoadTemplateData] = useState({});

  const [Types, setTypes] = useState([]);
  const [isAllActive, setAllActive] = useState(true);
  const [filterSelected, setFilterSelected] = useState({});

  const [currContact, setCurrContact] = useState();
  const [contactDropdown, setContactDropdown] = useState(false);

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

  useEffect(() => {
    habdelGetData(getSnippets, setSnippetLoading, history);
    habdelGetData(getTypes, setTypeLoading, history);
    habdelGetData(getContacts, setContactsLoading, history);
    habdelGetData(getInputField, setContactsLoading, history);
  }, []);

  useEffect(() => {
    //  Exptract And Remove Dublicate Placeholders
    if (snippets.length === 0) return;
    let currPlaceholders = snippets.flatMap((ele) => ele.placeholders);
    currPlaceholders = currPlaceholders.reduce((preValue, currValue) => {
      if (!preValue.length) {
        return [currValue];
      }
      if (!preValue.some((ele) => ele._id === currValue._id)) {
        return [...preValue, currValue];
      }
      return preValue;
    }, []);
    setPlaceholders(currPlaceholders);
  }, [snippets]);

  useEffect(() => {
    if (!items[1]) return;
    let HTML = items[1].items.map((ele) => ele.discription).join('');
    snippetHrmlRef.current.innerHTML = HTML;
    // current Placeholders
    let currPlaceholders = items[1].items
      .flatMap((ele) => ele.placeholders)
      .map((ele) => ele.name);
    // remove Dublicate
    currPlaceholders = [...new Set(currPlaceholders)];
    currPlaceholders = currPlaceholders.map((ele) => {
      return placeholders.find((placeholder) => placeholder.name === ele);
    });
    setInputItems(currPlaceholders);
    loadContact();
    updateLivePreview(currPlaceholders);
  }, [items]);

  const updateLivePreview = (updatedState, updatedEle) => {
    const query = updatedEle
      ? `.placeholder[data-_id="${updatedEle}"]`
      : '.placeholder.ql-placeholder-content';
    snippetHrmlRef.current.querySelectorAll(query).forEach((DomEle) => {
      const selected = updatedState.find(
        (ele) => ele._id === DomEle.dataset._id
      );
      if (!selected) return;
      DomEle.innerHTML = selected.value || selected.defaultValue;
    });
    setInputItems(updatedState);
  };

  const loadContact = (contact) => {
    const contactEle = snippetHrmlRef.current.querySelectorAll(
      `.contact.ql-placeholder-content`
    );
    contactEle.forEach((ele) => replaceWithDefaults(ele));
    if (!contact) return;
    replaceWithContact(contact, contactEle);
    setCurrContact(contact);
  };
  const replaceWithDefaults = (contactEle) => {
    const currContact = custom.find((ele) => ele.id === contactEle.dataset._id);
    if (currContact) {
      switch (currContact.type.label) {
        case CHECKBOX:
          contactEle.innerHTML = currContact.data.value
            .map((ele) => ele.label)
            .join(', ');
          break;
        case RADIO_BUTTON:
          contactEle.innerHTML = currContact.data.value.label;
          break;
        default:
          contactEle.innerHTML = currContact.data.value;
      }
      return;
    }
  };
  const replaceWithContact = (contact, contactEle) => {
    contactEle.forEach((ele) => {
      if (ele.dataset.name === 'name') {
        ele.value = contact.name;
        return;
      }
      const contactData = contact.data.find(
        (data) => data.name === ele.dataset.name
      );

      if (contactData) {
        switch (contactData.type.label) {
          case CHECKBOX:
            ele.innerHTML = contactData.value
              .map((ele) => ele.label)
              .join(', ');
            break;
          case RADIO_BUTTON:
            ele.innerHTML = contactData.value.label;
            break;
          default:
            ele.innerHTML = contactData.value;
        }
        return;
      }
      replaceWithDefaults(ele);
    });
  };

  let loadTemplate = () => {
    const data = [
      {
        id: 'un-selected-list',
        colSize: 2,
        items: snippets,
        label: 'Available Snippets'
      },
      {
        id: 'selected-list',
        colSize: 2,
        items: [],
        label: 'Selected Snippets'
      }
    ];

    // If Template Is Loaded Then Manage Their State
    const { snippets: templateSnippets, placeholders: templatePlaceholders } =
      loadTemplateData;
    if (templateSnippets && templateSnippets.length !== 0) {
      setIsupdatePlaceholder(false);
      const unselectedList = snippets.filter(
        (ele) => !templateSnippets.includes(ele._id)
      );
      const selectedList = templateSnippets
        .map((snippetId) => snippets.find((ele) => ele._id === snippetId))
        .filter((ele) => ele);
      data[0].items = unselectedList;
      data[1].items = selectedList;
      //  Replace Placeholder Values
      const newInputItems = inputItems.map((placeholder) => {
        const placeholderValue = templatePlaceholders.find(
          (ele) => ele?.name === placeholder?.name
        );
        placeholder.value = placeholderValue.value || placeholder.value;
        console.log(placeholder);
        return placeholder;
      });
      //  Set All The State
      setItems(newInputItems);
      setItems(data);
      setLoadTemplateData({});
      setModal(false);
      setIsupdatePlaceholder(true);
    }
    if (loadTemplateData.reset) {
      const newInputItems = inputItems.map((placeholder) => {
        placeholder.value = '';
        return placeholder;
      });
      setInputItems(newInputItems);
      setItems(data);
      setLoadTemplateData({});
    }
    return data;
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.snippets" />
            </h1>

            <div className="text-zero top-right-button-container mr-2 d-flex">
              <div
                className="glyph"
                type="button"
                onClick={() => setDebugPlaceholders(!debugPlaceholders)}>
                <i className="glyph-icon simple-icon-eye h4 text-primary mx-3" />
              </div>
              <div
                className="glyph"
                type="button"
                onClick={() => setFormVisible(!formVisible)}>
                <i className="glyph-icon iconsminds-save h4 text-primary mx-3" />
              </div>
              <div
                className="glyph"
                type="button"
                onClick={() => setModal(!modal)}>
                <i className="glyph-icon simple-icon-layers h4 text-primary mx-3" />
              </div>
              <div
                className="glyph"
                type="button"
                onClick={() => setLoadTemplateData({ reset: true })}>
                <i className="glyph-icon simple-icon-reload h4 text-primary mx-3" />
              </div>
              <Dropdown
                isOpen={contactDropdown}
                toggle={() => setContactDropdown(!contactDropdown)}
                className="ml-2">
                <DropdownToggle caret color="secondary" outline>
                  <IntlMessages id="inser.contact" />
                </DropdownToggle>
                <DropdownMenu>
                  {(contacts &&
                    contacts.map((contact) => (
                      <DropdownItem
                        key={contact._id}
                        onClick={(e) => {
                          e.preventDefault();
                          loadContact(contact);
                        }}>
                        <span>{contact.name}</span>
                      </DropdownItem>
                    ))) || <DropdownItem>No Contact is Found</DropdownItem>}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Breadcrumb match={match} />
          </div>
          <HandelTemplate
            modal={modal}
            snippets={items[1]}
            setModal={setModal}
            history={history}
            formVisible={formVisible}
            loadTemplate={setLoadTemplateData}
            setFormVisible={setFormVisible}
          />
          <AddTemplate
            setModal={setModal}
            formVisible={formVisible}
            setFormVisible={setFormVisible}
            snippets={items[1]}
            history={history}
            placeholders={inputItems}
          />
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" className="mb-4">
              <Row>
                <Colxx xxs="12">
                  <Card className="mb-4">
                    <Nav className="nav-pills ">
                      <NavItem>
                        <NavLink
                          href="#"
                          active={isAllActive}
                          onClick={() => {
                            setFilterSelected({});
                            setTypes(
                              Types.map((type) => {
                                return { ...type, active: false };
                              })
                            );
                            setAllActive(true);
                          }}>
                          All
                        </NavLink>
                      </NavItem>

                      {Types.map((ele) => (
                        <NavItem key={ele._id}>
                          <NavLink
                            active={ele.active}
                            href="#"
                            onClick={() => {
                              setTypes(
                                Types.map((type) => {
                                  setAllActive(false);
                                  if (type._id === ele._id) {
                                    setFilterSelected(ele);
                                    return { ...ele, active: true };
                                  } else {
                                    return { ...type, active: false };
                                  }
                                })
                              );
                            }}>
                            {ele.name}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </Card>
                </Colxx>
              </Row>

              <Row style={{ minHeight: '50vh' }}>
                {snippets.length !== 0 && (
                  <SnippetsGroups
                    items={items}
                    setItems={setItems}
                    filter={filterSelected}
                    isAllActive={isAllActive}
                    data={loadTemplate()}
                    history={history}
                  />
                )}
                {snippets.length === 0 && (
                  <>
                    <Colxx xxs="2">
                      <Card className="height__100">
                        <CardBody className="height__100">Loading...</CardBody>
                      </Card>
                    </Colxx>
                    <Colxx xxs="2">
                      <Card className="height__100">
                        <CardBody className="height__100">Loading...</CardBody>
                      </Card>
                    </Colxx>
                  </>
                )}
                {isupdatePlaceholder && (
                  <>
                    <InputItems
                      inputs={inputItems}
                      setInputes={updateLivePreview}
                    />

                    <LivePreview
                      debugMode={debugPlaceholders}
                      refrance={snippetHrmlRef}
                    />
                  </>
                )}

                {loading && snippets.length === 0 && (
                  <div className="loading" />
                )}
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({
  snippets: { snippets, loading },
  types: { types },
  user: { user },
  contacts: { contacts, inputs }
}) => ({
  snippets,
  user,
  loading,
  types,
  contacts,
  inputs
});

export default connect(mapStateToProps, {
  getSnippets,
  setSnippetLoading,
  getTypes,
  setTypeLoading,
  getContacts,
  setContactsLoading,
  getInputField
})(Template);
