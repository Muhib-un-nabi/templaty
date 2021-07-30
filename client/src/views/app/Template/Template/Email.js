import React, { useEffect, useRef, useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import {
  FormGroup,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Alert
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import serverApi, { authHeader } from '../../../../api';
import { updataPakageActionEmmiter } from '../../../../webSocket/index';

import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from '../../../../components/common/react-notifications';
import Editor from '../../snippets/Editor/index';

const Email = ({
  contacts,
  value,
  user,

  smtp,
  smtpLoading,

  emailModel,
  setEmailModel
}) => {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isReset, setIsReset] = useState(false);

  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [from, setFrom] = useState([]);
  const [fromTags, setFromTags] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // fetch

  const sendMail = async () => {
    try {
      if (!to || !from || !subject || !body) {
        setValidationError(true);
        setTimeout(() => {
          setValidationError(false);
        }, 5000);
        return;
      }
      setLoading(true);
      const mail = {
        to: [...to.map((ele) => ele.value), ...fromTags],
        cc: cc.map((ele) => ele.value),
        bcc: bcc.map((ele) => ele.value),
        from: from.value,
        subject,
        body
      };
      const info = await serverApi.post(`/smtp/send`, mail, authHeader());
      NotificationManager.success(
        'Success message',
        'Email Sended Sucessfully',
        3000,
        null,
        null
      );
      setEmailModel(false);
      updataPakageActionEmmiter(user.team);
    } catch (e) {
      console.dir(e.toJSON());
      // console.log(e.Error);
      setEmailError(e.Error);
      setTimeout(() => {
        setEmailError('');
      }, 5000);
      NotificationManager.error('Error message', e.message, 3000, null, null);
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setTo([]);
    setCc([]);
    setBcc([]);
    setFrom([]);
    setFromTags([]);
    setSubject('');
    setBody('');
  };
  useEffect(() => {
    if (emailModel) {
      const html = value.innerHTML.replaceAll('ql-placeholder-content', '');
      return setBody(html);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailModel]);

  const selectDataSMTP = () => {
    return (
      smtp.map(({ _id, mail, type }) => ({
        label: `${type.toUpperCase()} <${mail}>`,
        value: _id,
        key: _id
      })) || []
    );
  };
  const selectData = () => {
    return (
      contacts.map(({ _id, name, email }) => ({
        label: `${name} <${email}>`,
        value: email,
        key: _id
      })) || []
    );
  };

  return (
    <Modal
      size="lg"
      isOpen={emailModel}
      toggle={() => setEmailModel(loading ? true : !emailModel)}>
      <ModalHeader className=" email-header">
        <div className="w-100 d-flex justify-content-between">
          <IntlMessages id="email.send" />
          <div className="d-flex">
            <div className="glyph" type="button" onClick={sendMail}>
              <i className="glyph-icon iconsminds-mail-send h4 text-primary mx-3" />
            </div>
            <div className="glyph" type="button" onClick={reset}>
              <i className="glyph-icon simple-icon-reload  h4 text-primary mx-3" />
            </div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }} className=".normal-style">
        {smtpLoading || (loading && <div className="loading" />)}
        {validationError && (
          <Alert color="danger">
            <IntlMessages id="email.validation-error" />
          </Alert>
        )}
        {emailError && <Alert color="danger">{emailError}</Alert>}
        {!smtpLoading && smtp && smtp.length && (
          <>
            <FormGroup>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder="From"
                value={from}
                onChange={setFrom}
                options={selectDataSMTP()}
              />
            </FormGroup>
            <FormGroup className="d-flex">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select w-50 mr-2"
                classNamePrefix="react-select"
                isMulti
                name="form-field-name"
                placeholder="To"
                value={to}
                onChange={setTo}
                options={selectData()}
              />
              <div className="w-50 ml-2">
                <TagsInput
                  value={fromTags}
                  onChange={setFromTags}
                  inputProps={{ placeholder: 'To (custom)' }}
                />
              </div>
            </FormGroup>
            <div className="d-flex">
              <FormGroup className=" w-50 mr-2">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  placeholder="Cc"
                  value={cc}
                  onChange={setCc}
                  options={selectData()}
                />
              </FormGroup>
              <FormGroup className=" w-50 ml-2">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  placeholder="Bcc"
                  value={bcc}
                  onChange={setBcc}
                  options={selectData()}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Input
                required
                type="text"
                value={subject}
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Editor value={body} setValue={setBody} />
            </FormGroup>
          </>
        )}
        <Button
          onClick={sendMail}
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
            <IntlMessages id="email.send" />
          </span>
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default Email;
