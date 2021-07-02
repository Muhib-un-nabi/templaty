/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import {
  getTemplates,
  setLoading,
  deletePlaceholder
} from '../../../../redux/template/action';
import habdelGetData from '../../../../helpers/habdelGetData';

import TemplateItem from './templateItem';
// import AddTemplate from '../handelTemplate/addTemplate';

const index = ({
  modal,
  setModal,
  getTemplates,
  setLoading,
  history,
  template,
  user,
  snippets,
  formVisible,
  setFormVisible,
  loading,
  deletePlaceholder,
  loadTemplate
}) => {
  useEffect(() => {
    if (!modal) return;
    habdelGetData(getTemplates, setLoading, history);
  }, [modal]);

  return (
    <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
      <ModalHeader>
        <IntlMessages id="template" />
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }}>
        {loading && <div>Loading...</div>}
        {template.length === 0 && <div>No Template Is Found</div>}
        {template.length !== 0 &&
          template.map((itemData) => (
            <div key={itemData._id}>
              <TemplateItem
                loadTemplate={loadTemplate}
                itemData={itemData}
                user={user}
                deleteClick={deletePlaceholder}
              />
            </div>
          ))}
      </ModalBody>
      <Button
        className="mb-2"
        onClick={() => {
          setFormVisible(true);
          setModal(false);
        }}
        color="primary m-4"
        outline>
        <IntlMessages id="template.add" />
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({
  template: { template, loading },
  user: { user }
}) => ({
  template,
  user,
  loading
});

export default connect(mapStateToProps, {
  getTemplates,
  setLoading,
  deletePlaceholder
})(index);
