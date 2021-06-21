import React, { useEffect, useRef, useState } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
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
  user
}) => {
  const [items, setItems] = useState([]);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState();
  const [inputItems, setInputItems] = useState([]);
  const snippetHrmlRef = useRef();
  const [debugPlaceholders, setDebugPlaceholders] = useState(true);
  useEffect(() => {
    habdelGetData(getSnippets, setLoading, history);
  }, []);

  useEffect(() => {
    if (!items[1]) return;
    let HTML = items[1].items.map((ele) => ele.discription).join('');
    let currPlaceholders = items[1].items.flatMap((ele) => ele.placeholders);

    //  Remove Dublicate InputItems Placeholders
    currPlaceholders = currPlaceholders.reduce((preValue, currValue) => {
      if (!preValue.length) {
        return [currValue];
      }
      if (!preValue.some((ele) => ele._id === currValue._id)) {
        return [...preValue, currValue];
      }
      return preValue;
    }, []);

    setInputItems(() => {
      return currPlaceholders.map((ele) => {
        const isAvaliable = inputItems.find(
          (inputItem) => ele._id === inputItem._id
        );
        if (isAvaliable) {
          return isAvaliable;
        }
        return ele;
      });
    });

    setSelectedPlaceholder(currPlaceholders);
    snippetHrmlRef.current.innerHTML = HTML;
  }, [items]);

  useEffect(() => {
    replacePlacehlders(snippetHrmlRef, selectedPlaceholder);
  }, [inputItems]);

  const replacePlacehlders = (snippetHrmlRef, placeholders) => {
    if (debugPlaceholders) {
      snippetHrmlRef.current.classList.add('normal-style');
    }
    const slectedDOMPlaceholder = snippetHrmlRef.current.querySelectorAll(
      '.ql-placeholder-content'
    );
    if (!slectedDOMPlaceholder) return;

    slectedDOMPlaceholder.forEach((DOMEle) => {
      const currPlaceholder = placeholders.find(
        (ele) => ele.name === DOMEle.dataset.id
      );
      console.log(currPlaceholder.value);
      DOMEle.innerHTML = currPlaceholder.value || currPlaceholder.defaultValue;
    });
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
          <div
            style={{ minHeight: '10vh' }}
            onClick={(e) => {
              setDebugPlaceholders(!debugPlaceholders);
            }}>
            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>
      <Card>
        <CardBody>
          <Row style={{ minHeight: '50vh' }}>
            {snippets.length !== 0 && (
              <SnippetsGroups items={items} setItems={setItems} data={DATA} />
            )}
            <InputItems inputs={inputItems} setInputes={setInputItems} />
            <LivePreview refrance={snippetHrmlRef} />
            {snippets.length === 0 && <div className="loading" />}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = ({ snippets: { snippets }, user: { user } }) => ({
  snippets,
  user
});

export default connect(mapStateToProps, {
  getSnippets,
  setLoading
})(Template);
