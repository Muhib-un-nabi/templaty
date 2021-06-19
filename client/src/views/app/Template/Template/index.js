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
  const [items, setItems] = useState([]);

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
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="template" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {snippets.length === 0 && <div className="loading"></div>}
        {snippets.length !== 0 && (
          <LeadsOverview items={items} setItems={setItems} data={DATA} />
        )}
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
        <Colxx xxs={colSize} className="mb-4">
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div>
              {items.map((item, index) => (
                <div key={item._id} className="py-2">
                  <Draggable draggableId={item._id} index={index}>
                    {(provided) => (
                      <div
                        className="card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <SnippetItem itemData={item} />
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
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
})(BlankPage);
