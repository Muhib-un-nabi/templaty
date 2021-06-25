import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, CardBody, CardTitle } from 'reactstrap';

import SnippetItem from './SnippetItem';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function SnippetsGroups({ data, items, setItems }) {
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
        <DroppableList key={item.id} {...item} />
      ))}
    </DragDropContext>
  );
}

function DroppableList({ id, items, colSize, label }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Colxx xxs={colSize} className="">
          <Card className="height__100">
            <CardBody className="p-2 height__100">
              <CardTitle className="p-2 mb-2">{label}</CardTitle>
              <div
                className=" height__100"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable
                    draggableId={item._id}
                    index={index}
                    key={item._id}>
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
            </CardBody>
          </Card>
        </Colxx>
      )}
    </Droppable>
  );
}

export default SnippetsGroups;
