import React from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const livePreview = ({ refrance }) => {
  return (
    <Colxx xxs="6" className="mb-4">
      <div className="border p-4 " ref={refrance}></div>
    </Colxx>
  );
};

export default livePreview;
