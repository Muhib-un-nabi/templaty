/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import { addType, setLoading } from '../../../../redux/types/action';

const Index = ({ visible, setVisible, loading, addType, setLoading }) => {
  const [name, setName] = useState();
  const handelAddSnippet = async (e) => {
    try {
      e.preventDefault();
      await setLoading();
      await addType({ name });
      await setVisible(false);
    } catch (e) {
      await setLoading(false);
    }
  };
  return (
    <Modal size="lg" isOpen={visible} toggle={() => setVisible(!visible)}>
      <ModalHeader>
        <IntlMessages id="type.add" />
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }}>
        <form onSubmit={handelAddSnippet}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}></Input>
          </FormGroup>
        </form>
      </ModalBody>
      <Button
        onClick={handelAddSnippet}
        disabled={loading}
        color="primary"
        className={`btn-shadow m-4 btn-multiple-state ${
          loading ? 'show-spinner' : ''
        }`}>
        <span className="spinner d-inline-block">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </span>
        <span className="label">
          <IntlMessages id="type.add" />
        </span>
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({ types: { loading } }) => ({
  loading
});

export default connect(mapStateToProps, { addType, setLoading })(Index);
