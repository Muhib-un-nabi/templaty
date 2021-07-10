import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio
} from 'availity-reactstrap-validation';

import React from 'react';
import { Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import IntlMessages from '../../../../helpers/IntlMessages';

const Account = ({
  match,
  user,
  history,
  defaultValues = { port: 465 },
  onSubmitHandler,
  loading,
  SMTPfor = 'user'
}) => {
  const onSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      // submit
      onSubmitHandler({ ...values, type: SMTPfor });
    }
  };
  let isEditable = SMTPfor === 'user' || user.role === 'admin';
  return (
    <AvForm
      model={defaultValues}
      className="av-tooltip tooltip-label-right"
      onSubmit={(event, errors, values) => onSubmit(event, errors, values)}>
      <AvGroup>
        <Label>Mail or Username</Label>
        <AvInput name="mail" type="email" required disabled={!isEditable} />
        <AvFeedback>Mail is required!</AvFeedback>
      </AvGroup>

      <AvGroup>
        <Label>Password</Label>
        <AvInput
          type="password"
          name="password"
          required
          disabled={!isEditable}
        />
        <AvFeedback>Password is required!</AvFeedback>
      </AvGroup>

      <AvGroup>
        <Label>Host</Label>
        <AvInput name="host" required disabled={!isEditable} />
        <AvFeedback>Host is required!</AvFeedback>
      </AvGroup>

      <AvGroup>
        <Label>Port</Label>
        <AvInput name="port" type="numbers" required disabled={!isEditable} />
        <AvFeedback>Port is required!</AvFeedback>
      </AvGroup>

      <Button
        disabled={!isEditable || loading}
        color="primary"
        className={`btn-shadow my-2 btn-multiple-state w-100 ${
          loading ? 'show-spinner' : ''
        }`}>
        <span className="spinner d-inline-block">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </span>
        <span className="label">
          <IntlMessages id={`smtp.update.setting`} />
        </span>
      </Button>
    </AvForm>
  );
};

const mapStateToProps = ({ user: { user }, smtp: { loading } }) => ({
  user,
  loading
});

export default connect(mapStateToProps)(Account);
