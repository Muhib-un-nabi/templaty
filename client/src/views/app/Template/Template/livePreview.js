import React from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const livePreview = ({ refrance, debugMode }) => {
  return (
    <Colxx xxs="6" className="mb-4">
      <div
        className={`border p-4 ${debugMode && 'normal-style'}`}
        ref={refrance}></div>
    </Colxx>
  );
};

export default livePreview;
