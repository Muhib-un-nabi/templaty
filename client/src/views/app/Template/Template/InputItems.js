import React from 'react';
import {
  Row,
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  FormText
} from 'reactstrap';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';

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
                const updatedState = inputs.map((ele) => {
                  if (ele._id === e.target.id) {
                    ele.value = e.target.value;
                  }
                  return ele;
                });
                setInputes(updatedState);
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
