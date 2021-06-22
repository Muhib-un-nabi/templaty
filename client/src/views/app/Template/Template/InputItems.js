import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const InputItems = ({ inputs, setInputes }) => {
  return (
    <Colxx xxs="2" className="mb-4">
      <Form>
        {inputs.map((ele) => (
          <FormGroup key={ele._id}>
            <Label for="exampleEmail">
              <b>{ele.name}</b> <small>{` {{${ele.name}}}`}</small>
            </Label>
            <Input
              onChange={(e) => {
                let updatedEleName;
                const updatedState = inputs.map((ele) => {
                  if (ele._id === e.target.id) {
                    updatedEleName = ele.name;
                    ele.value = e.target.value;
                  }
                  return ele;
                });
                setInputes(updatedState, updatedEleName);
              }}
              value={ele.value || ele.defaultValue}
              type="text"
              name={ele.name}
              id={ele._id}
              data-placeholder={`{{${ele.name}}}`}
            />
          </FormGroup>
        ))}
      </Form>
    </Colxx>
  );
};

export default InputItems;
