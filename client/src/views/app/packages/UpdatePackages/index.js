/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
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
import {
  updateType,
  setLoading,
  clearCurrent
} from '../../../../redux/types/action';

const Index = ({
  visible,
  setVisible,
  loading,
  updateType,
  setLoading,
  current,
  clearCurrent
}) => {
  const [name, setName] = useState();

  useEffect(() => {
    setName(current.name);
  }, [current]);

  const handelAddSnippet = async (e) => {
    try {
      e.preventDefault();
      await setLoading();
      await updateType({ name }, current._id);
      await setVisible(false);
    } catch (e) {
      await setLoading(false);
    } finally {
      clearCurrent();
    }
  };
  return (
    <Modal size="lg" isOpen={visible} toggle={() => setVisible(!visible)}>
      <ModalHeader>
        <IntlMessages id="type.update" />
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }}>
        {(!loading && (
          <form onSubmit={handelAddSnippet}>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}></Input>
            </FormGroup>
          </form>
        )) || <div className="loading" />}
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
          <IntlMessages id="type.update" />
        </span>
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({ types: { loading, current } }) => ({
  loading,
  current
});

export default connect(mapStateToProps, {
  updateType,
  setLoading,
  clearCurrent
})(Index);
