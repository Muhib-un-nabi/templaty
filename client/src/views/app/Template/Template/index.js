/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
// import IntlMessages from '../../../../helpers/IntlMessages';

import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import habdelGetData from '../../../../helpers/habdelGetData';

import { getSnippets, setLoading } from '../../../../redux/snippets/action';

import SnippetsGroups from './SnippetsGroups';
import InputItems from './InputItems';
import LivePreview from './livePreview';

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

  const DATA = [
    {
      id: 'un-selected-list',
      colSize: 2,
      items: snippets
    },
    {
      id: 'selected-list',
      colSize: 2,
      items: []
    }
  ];

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="template" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Card>
        <CardBody>
          <Button
            onClick={() => setDebugPlaceholders(!debugPlaceholders)}
            color="primary"
            className="mt-4">
            Debug Mode
          </Button>
          <Row style={{ minHeight: '50vh' }}>
            {snippets.length !== 0 && (
              <SnippetsGroups items={items} setItems={setItems} data={DATA} />
            )}
            <InputItems inputs={inputItems} setInputes={updateLivePreview} />
            {snippets.length === 0 && <p>No Snippet Is Found</p>}
            <LivePreview
              debugMode={debugPlaceholders}
              refrance={snippetHrmlRef}
            />
            {loading && <div className="loading" />}
          </Row>
        </CardBody>
      </Card>
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
