import React, { useEffect, useRef, useState } from 'react';
import {
  FormGroup,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Label,
  CustomInput
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import { NotificationManager } from '../../../../components/common/react-notifications';

import { updataPakageActionEmmiter } from '../../../../webSocket/index';

import Editor from '../../snippets/Editor/index';

const Copy = ({ dataRef, copyModel, setCopyModel, user }) => {
  const [loading, setLoading] = useState(false);
  const [copyAsText, setCopyAsText] = useState(true);

  const [body, setBody] = useState('');

  const reset = () => {
    setBody('');
    setCopyAsText(true);
  };
  useEffect(() => {
    if (copyModel) {
      const html = dataRef.current.innerHTML.replaceAll(
        'ql-placeholder-content',
        ''
      );
      return setBody(html);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyModel]);

  const copy = async () => {
    try {
      setLoading(true);
      let data = body;
      if (copyAsText) data = body.replace(/<[^>]+>/g, '');
      await navigator.clipboard.writeText(data);
      NotificationManager.success(
        'Success message',
        `Copy Sucessfully In ${copyAsText ? 'Text ' : 'HTML'} Formate`,
        3000,
        null,
        null
      );
      updataPakageActionEmmiter(user.team);
    } catch (e) {
      NotificationManager.error(
        'Error message',
        'Text Was not copied',
        3000,
        null,
        null
      );
    } finally {
      setLoading(false);
    }
    // console.log(data);
  };

  return (
    <Modal
      size="lg"
      isOpen={copyModel}
      toggle={() => setCopyModel(loading ? true : !copyModel)}>
      <ModalHeader className="  email-header">
        <div className="w-100 d-flex justify-content-between">
          <IntlMessages id="copy" />
          <div className="d-flex">
            <div className="glyph" type="button" onClick={copy}>
              <i className="glyph-icon iconsminds-file-copy h4 text-primary mx-3" />
            </div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }} className=".normal-style">
        <>
          <FormGroup>
            <Label for="exCustomRadio">
              <IntlMessages id="copy.as" />
            </Label>
            <div>
              <CustomInput
                defaultChecked
                type="radio"
                id="exCustomRadio"
                name="customRadio"
                label="Text"
                onChange={(e) => setCopyAsText(true)}
              />
              <CustomInput
                type="radio"
                id="exCustomRadio2"
                name="customRadio"
                label="HTML"
                onChange={(e) => setCopyAsText(false)}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Editor value={body} setValue={setBody} />
          </FormGroup>
        </>

        <Button
          onClick={copy}
          disabled={loading}
          color="primary"
          className={`btn-shadow  w-100 btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}>
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="copy" />
          </span>
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default Copy;
