import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  FormGroup,
  Label,
  Button
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx } from '../../../components/common/CustomBootstrap';

import { connect } from 'react-redux';
import {
  addPackage,
  getPackages,
  setLoading
} from '../../../redux/packages/action';

import habdelGetData from '../../../helpers/habdelGetData';

const Index = ({
  // Data
  packages,
  // Actions
  getPackages,
  addPackage,
  setLoading,

  history
}) => {
  const [addPakageModle, setAddPakageModle] = useState(true);

  useEffect(() => {
    habdelGetData(getPackages, setLoading, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = (values) => {
    addPackage(values);
  };

  const validate = (value) => {
    let error;
    if (value === '') {
      error = 'Please enter value';
    }
    return error;
  };

  return (
    <>
      <Modal
        isOpen={addPakageModle}
        size="lg"
        toggle={() => setAddPakageModle(!addPakageModle)}>
        <ModalHeader>Add New Pakaege</ModalHeader>
        <ModalBody>
          <Row className="">
            <Colxx xxs="12">
              <Formik
                initialValues={{
                  name: ''
                }}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-right add-pakage-form">
                    <FormGroup className="w-100 p-2">
                      <Label>Name</Label>
                      <Field
                        className="form-control"
                        name="name"
                        validate={validate}
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Duration (in Months)</Label>
                      <Field
                        className="form-control"
                        name="duration"
                        validate={validate}
                        type="number"
                      />
                      {errors.duration && touched.duration && (
                        <div className="invalid-feedback d-block">
                          {errors.duration}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Price</Label>
                      <Field
                        className="form-control"
                        name="price"
                        validate={validate}
                        type="number"
                      />
                      {errors.price && touched.price && (
                        <div className="invalid-feedback d-block">
                          {errors.price}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Users</Label>
                      <Field
                        className="form-control"
                        name="users"
                        validate={validate}
                        type="number"
                      />
                      {errors.users && touched.users && (
                        <div className="invalid-feedback d-block">
                          {errors.users}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Snippets</Label>
                      <Field
                        className="form-control"
                        name="snippets"
                        validate={validate}
                        type="number"
                      />
                      {errors.snippets && touched.snippets && (
                        <div className="invalid-feedback d-block">
                          {errors.snippets}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Templates</Label>
                      <Field
                        className="form-control"
                        name="templates"
                        validate={validate}
                        type="number"
                      />
                      {errors.templates && touched.templates && (
                        <div className="invalid-feedback d-block">
                          {errors.templates}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="w-50 p-2">
                      <Label>Actions</Label>
                      <Field
                        className="form-control"
                        name="actions"
                        validate={validate}
                        type="number"
                      />
                      {errors.actions && touched.actions && (
                        <div className="invalid-feedback d-block">
                          {errors.actions}
                        </div>
                      )}
                    </FormGroup>

                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Colxx>
          </Row>
        </ModalBody>
      </Modal>
      <div>
        {packages &&
          packages.length &&
          packages.map((ele) => (
            <div key={ele._id}>
              <h1>{ele.name}</h1>
              <p>{ele.duration}</p>
              <p>{ele.price}</p>
              <p>{ele.users}</p>
              <p>{ele.snippets}</p>
              <p>{ele.templates}</p>
              <p>{ele.actions}</p>
            </div>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = ({ packages: { packages } }) => ({ packages });

export default connect(mapStateToProps, {
  addPackage,
  getPackages,
  setLoading
})(Index);
