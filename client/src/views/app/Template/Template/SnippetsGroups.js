import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import SnippetItem from './SnippetItem';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { adminRoot } from '../../../../constants/defaultValues';

function SnippetsGroups({
  data,
  items,
  setItems,
  filter,
  isAllActive,
  history
}) {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    const groups = Object.keys(data).reduce(
      (accum, _, i) => ({ ...accum, [data[i].id]: i }),
      {}
    );
    setItems(data);
    setGroups(groups);

    return () => setItems([]);
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
        <DroppableList
          key={item.id}
          {...item}
          filter={filter}
          isAllActive={isAllActive}
          history={history}
        />
      ))}
    </DragDropContext>
  );
}

function DroppableList({
  id,
  items,
  colSize,
  label,
  filter,
  isAllActive,
  history
}) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Colxx xxs={colSize} className={id}>
          <Card className="height__100">
            <CardBody className="p-2 height__100">
              <CardTitle className="p-2 mb-2">{label}</CardTitle>
              <div
                className=" height__100"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {items.map((item, index) => {
                  let isDisplay;
                  if (filter && item.category) {
                    isDisplay = item.category
                      .map((ele) => ele.key)
                      .includes(filter._id);
                  } else if (!item.category) {
                    isDisplay = false;
                  } else {
                    isDisplay = true;
                  }
                  return (
                    <Draggable
                      draggableId={item._id}
                      index={index}
                      key={item._id}>
                      {(provided) => (
                        <div
                          data-display={isAllActive || isDisplay}
                          className="list-item"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                          <SnippetItem itemData={item} history={history} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
              {id === 'un-selected-list' && (
                <Button
                  color="primary"
                  className="mb-2 mx-2"
                  outline
                  onClick={() => history.push(`${adminRoot}/snippets/add`)}>
                  <IntlMessages id="menu.snippets-add" />
                </Button>
              )}
            </CardBody>
          </Card>
        </Colxx>
      )}
    </Droppable>
  );
}

export default SnippetsGroups;
