import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from 'availity-reactstrap-validation';

import React, { useEffect } from 'react';
import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';

const Account = ({
  match,
  user,
  history,
  formModel,
  setFormModel,
  defaultValues = { secure: 'no', port: 587 },
  onSubmitHandler,
  type = 'add',
  loading
}) => {
  const onSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      // submit
      onSubmitHandler(values);
    }
  };
  return (
    <Modal isOpen={formModel} size="lg" toggle={() => setFormModel(!formModel)}>
      <ModalHeader>
        <IntlMessages id="smtp.configre" />
      </ModalHeader>
      <ModalBody>
        <AvForm
          model={defaultValues}
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}>
          <AvGroup>
            <Label>Host</Label>
            <AvInput name="host" required />
            <AvFeedback>Host is required!</AvFeedback>
          </AvGroup>

          <AvRadioGroup className="error-l-150" name="secure" required>
            <Label className="d-block">Secure</Label>
            <AvRadio customInput label="yes" value="yes" />
            <AvRadio customInput label="no" value="no" />
          </AvRadioGroup>

          <AvGroup>
            <Label>Port</Label>
            <AvInput name="port" type="numbers" required />
            <AvFeedback>Port is required!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label>Mail or Username</Label>
            <AvInput name="mail" type="email" required />
            <AvFeedback>Mail is required!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label>Password</Label>
            <AvInput type="password" name="password" required />
            <AvFeedback>Password is required!</AvFeedback>
          </AvGroup>

          <Button
            disabled={loading}
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
              <IntlMessages id={`smtp.${type}`} />
            </span>
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = ({ user: { user }, smtp: { loading } }) => ({
  user,
  loading
});

export default connect(mapStateToProps)(Account);
