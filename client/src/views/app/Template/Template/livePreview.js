import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const livePreview = ({ refrance, debugMode }) => {
  return (
    <Colxx xxs="6">
      <Card className="height__100">
        <CardBody className="p-2 height__100">
          <CardTitle className="p-2 px-4 mb-2">Live Preview</CardTitle>
          <div
            className={` p-4 ${debugMode && 'normal-style'}`}
            ref={refrance}></div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default livePreview;
