import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';

import { checkLimit } from '../../../../components/limit';

const LivePreview = ({
  refrance,
  debugMode,
  hasSnippet,
  team,

  // cantrooles
  setEmailModel,
  setDownloadModel,
  setCopyModel
}) => {
  return (
    <Colxx xxs="6">
      <Card className="height__100">
        <CardBody className="p-2 height__100 ">
          <CardTitle className="p-2 px-4 mb-2">Live Preview</CardTitle>
          <div className="d-flex">
            <div
              className={` p-4 w-95 live-preview ${
                debugMode && 'normal-style'
              }`}
              ref={refrance}
            />
            {(hasSnippet && (
              <div className="d-flex flex-column">
                <div
                  className="glyph my-2"
                  type="button"
                  onClick={() =>
                    checkLimit({
                      cb: setCopyModel,
                      cbData: true,
                      checkFor: 'actions',
                      team
                    })
                  }>
                  <i className="glyph-icon iconsminds-file-copy h4 text-primary " />
                </div>
                <div
                  className="glyp my-2"
                  type="button"
                  onClick={() =>
                    checkLimit({
                      cb: setDownloadModel,
                      cbData: true,
                      checkFor: 'actions',
                      team
                    })
                  }>
                  <i className="glyph-icon iconsminds-download h4 text-primary " />
                </div>

                <div
                  className="glyph my-2"
                  type="button"
                  onClick={() =>
                    checkLimit({
                      cb: setEmailModel,
                      cbData: true,
                      checkFor: 'actions',
                      team
                    })
                  }>
                  <i className="glyph-icon iconsminds-mail-send h4 text-primary " />
                </div>
              </div>
            )) ||
              ''}
          </div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default LivePreview;
