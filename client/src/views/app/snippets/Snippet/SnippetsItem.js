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
  return (
    <ul>
      <li>
        <b>Types :</b> {itemData.category?.map((ele) => ele.label).join(', ')}
      </li>
      <li ref={descriptionRef} />
    </ul>
  );
};
export default PlaceholdersItem;
