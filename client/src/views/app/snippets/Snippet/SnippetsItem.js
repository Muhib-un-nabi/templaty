/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { useEffect, useRef } from 'react';

const PlaceholdersItem = ({ itemData }) => {
  const descriptionRef = useRef();

  useEffect(() => {
    if (!itemData.discription) return;
    descriptionRef.current.innerHTML =
      // eslint-disable-next-line prefer-template
      '<b>Discription</b> : ' + itemData.discription;
  }, [itemData]);
  // return null;
  const renderValue = (element) => {
    switch (element.type.id) {
      case 1:
        return <b>{element.data.value}</b>;
      case 2:
        return (
          <b>
            {element.data.value.map((ele) => (
              <span key={ele.id}> {ele.label} ,</span>
            ))}
          </b>
        );
      case 3:
        return <b>{element.data.value.label}</b>;
      default:
        return null;
    }
  };

  return (
    <ul>
      {itemData.data.map((ele) => (
        <li key={ele.id}>
          <>{ele.data.name.toUpperCase()}</> : <>{renderValue(ele)}</>
        </li>
      ))}
      <li>Types : {itemData.category.map((ele) => ele.label).join(', ')}</li>
      <li ref={descriptionRef} />
    </ul>
  );
};
export default PlaceholdersItem;
