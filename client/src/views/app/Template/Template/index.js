import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { connect } from 'react-redux';
// import IntlMessages from '../../../../helpers/IntlMessages';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import habdelGetData from '../../../../helpers/habdelGetData';
import {
  getPlaceholders,
  setLoading as setloadingPlaceholder
} from '../../../../redux/placeholder/action';
import {
  getSnippets,
  setLoading as setloadingSnippets
} from '../../../../redux/snippets/action';

import SnippetItem from './SnippetItem';

const Template = ({
  match,
  getSnippets,
  setloadingSnippets,
  getPlaceholders,
  setloadingPlaceholder,
  history,
  snippets,
  user,
  placeholders
}) => {
  const [items, setItems] = useState([]);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState();
  const [inputItems, setInputItems] = useState([]);
  const snippetHrmlRef = useRef();
  useEffect(() => {
    habdelGetData(getSnippets, setloadingSnippets, history);
    habdelGetData(getPlaceholders, setloadingPlaceholder, history);
  }, []);

  const DATA = [
    {
      id: 'un-selected-list',
      colSize: 2,
      items: snippets
    },
    {
      id: 'selected-list',
      colSize: 3,
      items: []
    }
  ];

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
          <Row style={{ minHeight: '50vh' }}>
            {snippets.length === 0 && <div className="loading"></div>}
            {snippets.length !== 0 && (
              <LeadsOverview items={items} setItems={setItems} data={DATA} />
            )}
            <Colxx xxs="2" className="mb-4">
              <Form>
                {inputItems.map((ele) => (
                  <FormGroup key={ele._id}>
                    <Label for="exampleEmail">{ele.name}</Label>
                    <Input
                      onChange={(e) => {
                        const updatedState = inputItems.map((ele) => {
                          if (ele._id === e.target.id) {
                            ele.value = e.target.value;
                          }
                          return ele;
                        });
                        setInputItems(updatedState);
                      }}
                      value={ele.value || ele.defaultValue}
                      type="text"
                      name={ele.name}
                      id={ele._id}
                      data-placeholder={`{{${ele.name}}}`}
                    />
                  </FormGroup>
                ))}
              </Form>
            </Colxx>
            <Colxx xxs="5" className="mb-4">
              <div ref={snippetHrmlRef}></div>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

const replacePlacehlders = (snippetHrmlRef, placeholders) => {
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

function LeadsOverview({ data, items, setItems }) {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    const groups = Object.keys(data).reduce(
      (accum, _, i) => ({ ...accum, [data[i].id]: i }),
      {}
    );
    setItems(data);
    setGroups(groups);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source } = result;
        if (!destination) {
          return;
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        const sourceDroppableIndex = groups[source.droppableId];
        const targetDroppableIndex = groups[destination.droppableId];
        const sourceItems = items[sourceDroppableIndex].items.slice();
        const targetItems =
          source.droppableId !== destination.droppableId
            ? items[targetDroppableIndex].items.slice()
            : sourceItems;

        // Pull the item from the source.
        const [deletedItem] = sourceItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, deletedItem);

        const workValue = items.slice();
        workValue[sourceDroppableIndex] = {
          ...items[sourceDroppableIndex],
          items: sourceItems
        };
        workValue[targetDroppableIndex] = {
          ...items[targetDroppableIndex],
          items: targetItems
        };

        setItems(workValue);
      }}>
      {items.map((item) => (
        <DroppableList key={item.id} {...item} />
      ))}
    </DragDropContext>
  );
}

function DroppableList({ id, items, colSize }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Colxx xxs={colSize}>
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable draggableId={item._id} index={index} key={item._id}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <SnippetItem itemData={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </Colxx>
      )}
    </Droppable>
  );
}

const mapStateToProps = ({
  snippets: { snippets },
  user: { user },
  placeholders: { placeholders }
}) => ({
  snippets,
  user,
  placeholders
});

export default connect(mapStateToProps, {
  getSnippets,
  getPlaceholders,
  setloadingPlaceholder,
  setloadingSnippets
})(Template);
