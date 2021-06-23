import React, { useEffect, useRef, useState } from 'react';
import { Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import habdelGetData from '../../../../helpers/habdelGetData';

import { getSnippets, setLoading } from '../../../../redux/snippets/action';

import SnippetsGroups from './SnippetsGroups';
import InputItems from './InputItems';
import LivePreview from './livePreview';

import HandelTemplate from '../handelTemplate/index';
import AddTemplate from '../handelTemplate/addTemplate';

const Template = ({
  match,
  getSnippets,
  setLoading,
  history,
  snippets,
  loading,
  user
}) => {
  const [items, setItems] = useState([]);
  const [debugPlaceholders, setDebugPlaceholders] = useState(true);
  const snippetHrmlRef = useRef();

  const [placeholders, setPlaceholders] = useState();

  const [selectedPlaceholder, setSelectedPlaceholder] = useState();
  const [inputItems, setInputItems] = useState([]);

  const [modal, setModal] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [loadingSnippet, setLoadingSnippet] = useState(false);
  const [loadTemplateids, setLoadTemplateids] = useState([]);

  useEffect(() => {
    habdelGetData(getSnippets, setLoading, history);
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
    updateLivePreview(currPlaceholders);
  }, [items]);

  const updateLivePreview = (updatedState, updatedEle) => {
    const query = updatedEle
      ? `[data-id="${updatedEle}"]`
      : '.ql-placeholder-content';
    snippetHrmlRef.current.querySelectorAll(query).forEach((DomEle) => {
      const selected = updatedState.find(
        (ele) => ele.name === DomEle.dataset.id
      );
      DomEle.innerHTML = selected.value || selected.defaultValue;
    });
    setInputItems(updatedState);
  };

  let loadTemplate = () => {
    console.log(loadTemplateids);
    return [
      {
        id: 'un-selected-list',
        colSize: 2,
        items: snippets.filter((ele) => !loadTemplateids.includes(ele._id))
      },
      {
        id: 'selected-list',
        colSize: 2,
        items: snippets.filter((ele) => loadTemplateids.includes(ele._id))
      }
    ];
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
                <i className="glyph-icon simple-icon-plus h4 text-primary mx-3" />
              </div>
              <div
                className="glyph"
                type="button"
                onClick={() => setModal(!modal)}>
                <i className="glyph-icon simple-icon-layers h4 text-primary ml-3" />
              </div>
            </div>
            <Breadcrumb match={match} />
          </div>
          <HandelTemplate
            modal={modal}
            snippets={items[1]}
            setModal={setModal}
            history={history}
            formVisible={formVisible}
            loadTemplate={setLoadTemplateids}
            setFormVisible={setFormVisible}
          />
          <AddTemplate
            setModal={setModal}
            formVisible={formVisible}
            setFormVisible={setFormVisible}
            snippets={items[1]}
          />
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" className="mb-4">
              <Card>
                <CardBody>
                  <Row style={{ minHeight: '50vh' }}>
                    {!loadingSnippet && (
                      <>
                        {snippets.length !== 0 && (
                          <SnippetsGroups
                            items={items}
                            setItems={setItems}
                            // data={dataGroup}
                            data={loadTemplate()}
                          />
                        )}
                        <InputItems
                          inputs={inputItems}
                          setInputes={updateLivePreview}
                        />
                        {snippets.length === 0 && <p>No Snippet Is Found</p>}
                        <LivePreview
                          debugMode={debugPlaceholders}
                          refrance={snippetHrmlRef}
                        />
                        {/* {loading && <div className="loading" />} */}
                      </>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
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
  setLoading
})(Template);
