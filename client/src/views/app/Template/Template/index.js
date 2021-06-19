import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
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
import Tesk from './Tesk';

const BlankPage = ({
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
  useEffect(() => {
    habdelGetData(getSnippets, setloadingSnippets, history);
    habdelGetData(getPlaceholders, setloadingPlaceholder, history);
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="template" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {/* <Tesk /> */}
      <Row>
        <Colxx xxs="2" className="mb-4">
          {/* {snippets.length !== 0 &&
            snippets.map((ele) => <SnippetItem key={ele._id} itemData={ele} />)} */}
          {snippets.length !== 0 &&
            snippets.map((ele) => (
              <LeadsOverview key={ele._id} itemData={ele} />
            ))}
        </Colxx>
        <Colxx xxs="3" className="mb-4">
          <p>snippets slected</p>
        </Colxx>
        <Colxx xxs="2" className="mb-4">
          <p>Inputs For Snippets</p>
        </Colxx>
        <Colxx xxs="5" className="mb-4">
          <p>Live Preview</p>
        </Colxx>
      </Row>
    </>
  );
};

const DATA = [
  {
    id: 'af1',
    label: 'Incoming leads',
    items: [
      { id: 'af2', label: 'Item 1' },
      { id: 'af3', label: 'Item 2' }
    ],
    tint: 1
  },
  {
    id: 'af4',
    label: 'Closing leads',
    items: [
      { id: 'af5', label: 'Item 1' },
      { id: 'af6', label: 'Item 2' }
    ],
    tint: 2
  }
];

function LeadsOverview() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});

  useEffect(() => {
    // Mock an API call.
    buildAndSave(DATA);
  }, []);

  function buildAndSave(items) {
    const groups = Object.keys(items).reduce(
      (accum, _, i) => ({ ...accum, [items[i].id]: i }),
      {}
    );
    setItems(items);

    setGroups(groups);
  }

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

function DroppableList({ id, items, tint }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <ul className="list">
            {items.map((item, index) => (
              <li className="list__item" key={item.id}>
                <Draggable draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="card"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      {item.label}
                    </div>
                  )}
                </Draggable>
              </li>
            ))}
            {provided.placeholder}
          </ul>
        </div>
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
})(BlankPage);
