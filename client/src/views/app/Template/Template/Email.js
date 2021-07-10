import React, { useEffect, useState } from 'react';

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Button,
  Input
} from 'reactstrap';
import {
  getInputField,
  setLoading as setContactLoading
} from '../../../../redux/contacts/action';
import IntlMessages from '../../../../helpers/IntlMessages';

import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

const Email = ({
  children,
  openAsEmail,
  setOpenAsEmail,
  contacts,

  smtp,
  smtpLoading,

  setTo,
  setCc,
  setBcc,
  setFrom,
  setSubject,

  to,
  cc,
  bcc,
  from,
  subject
}) => {
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
    <>
      {smtpLoading && <div className="loading"></div>}
      {openAsEmail && !smtpLoading && (
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
          <FormGroup>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              isMulti
              name="form-field-name"
              placeholder="To"
              value={to}
              onChange={setTo}
              options={selectData()}
            />
          </FormGroup>
          <FormGroup>
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
          <FormGroup>
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
          <FormGroup>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
            />
          </FormGroup>
        </>
      )}
      <div
        contentEditable={false}
        className={openAsEmail ? 'border border-secondary' : ''}>
        {children}
      </div>
    </>
  );
};

export default Email;
