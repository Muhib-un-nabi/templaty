import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Email from './Email';

const LivePreview = ({ refrance, debugMode }) => {
  const [openAsEmail, setOpenAsEmail] = useState(false);
  return (
    <Colxx xxs="6">
      <Card className="height__100">
        <CardBody className="p-2 height__100 ">
          {!openAsEmail && (
            <CardTitle className="p-2 px-4 mb-2">Live Preview</CardTitle>
          )}

          <Email openAsEmail={openAsEmail} setOpenAsEmail={setOpenAsEmail}>
            <div
              className={` p-4 ${debugMode && 'normal-style'}`}
              ref={refrance}
            />
          </Email>
        </CardBody>
        <div className="m-2 d-flex align-self-end ">
          <Button
            color="primary"
            className="mb-2 mx-2"
            onClick={() => setOpenAsEmail(!openAsEmail)}>
            {(!openAsEmail && <span>Send As Mail</span>) || <span>Send</span>}
            {/* <IntlMessages id="menu.snippets-add" /> */}
          </Button>
        </div>
      </Card>
    </Colxx>
  );
};

export default LivePreview;
