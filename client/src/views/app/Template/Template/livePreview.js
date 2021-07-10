import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Email from './Email';

import { connect } from 'react-redux';

import { senMail } from '../../../../redux/SMTP/action';

const LivePreview = ({
  refrance,
  debugMode,
  contacts,
  hasSnippet,
  smtpLoading,
  setLoadTemplateData,
  smtp,

  senMail
}) => {
  const [openAsEmail, setOpenAsEmail] = useState(false);
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [from, setFrom] = useState([]);
  const [subject, setSubject] = useState('');

  const sendMail = () => {
    if (!subject || to.length === 0 || from.length === 0) return false;
    const extractValue = (arry) => arry.map((ele) => ele.value);
    const newMail = {
      to: extractValue(to),
      cc: extractValue(cc),
      bcc: extractValue(bcc),
      from: from.value,
      subjec: subject,
      body: refrance.current.innerHTML
    };
    senMail(newMail);
    setTo([]);
    setCc([]);
    setBcc([]);
    setFrom([]);
    setSubject('');
    setOpenAsEmail(false);
    return true;
  };

  return (
    <Colxx xxs="6">
      <Card className="height__100">
        <CardBody className="p-2 height__100 ">
          {!openAsEmail && (
            <CardTitle className="p-2 px-4 mb-2">Live Preview</CardTitle>
          )}

          <Email
            openAsEmail={openAsEmail}
            setOpenAsEmail={setOpenAsEmail}
            contacts={contacts}
            smtp={smtp}
            smtpLoading={smtpLoading}
            setTo={setTo}
            setCc={setCc}
            setBcc={setBcc}
            setFrom={setFrom}
            setSubject={setSubject}
            to={to}
            cc={cc}
            bcc={bcc}
            from={from}
            subject={subject}>
            <div
              className={` p-4 ${debugMode && 'normal-style'}`}
              ref={refrance}
            />
          </Email>
        </CardBody>
        {(hasSnippet && (
          <div className="m-2 d-flex align-self-end ">
            <Button
              color="primary"
              className="mb-2 mx-2"
              onClick={() => {
                if (openAsEmail) {
                  return sendMail() && setLoadTemplateData({ reset: true });
                }
                setOpenAsEmail(!openAsEmail);
              }}>
              {(!openAsEmail && <span>Send As Mail</span>) || <span>Send</span>}
            </Button>
          </div>
        )) ||
          ''}
      </Card>
    </Colxx>
  );
};

export default connect(null, { senMail })(LivePreview);
