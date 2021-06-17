/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import _ from 'lodash';
import {
  // Card,
  Button,
  // Collapse,
  FormGroup,
  Label,
  Form,
  Input,
  Badge,
  //   CustomInput,
} from 'reactstrap';
import Select from 'react-select';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuidV4 } from 'uuid';
import ControlledInput, {
  defaultInputObj,
} from '../../../../../components/custom/ControlledInput';
import CustomSelectInput from '../../../../../components/common/CustomSelectInput';
import inputTypes from '../../../../../constants/inputTypes';

const EditMode = ({ inputData, onChangeHandler }) => {
  const { id, data, type } = inputData;
  let { name, key, options, value } = data;
  const Name = defaultInputObj({ name: 'title', key: 'title', value: name });
  const Key = defaultInputObj({
    name: Name.data.name,
    key: Name.data.name,
    value: key,
  });
  const Options = defaultInputObj({
    name: Name.data.name,
    key: Name.data.name,
    value: options,
  });
  const Type = defaultInputObj({
    name: Name.data.name,
    key: Name.data.name,
    value: type,
  });

  return (
    <Form>
      <FormGroup>
        <Label>Title</Label>
        <ControlledInput
          placholder="Enter Value"
          inputData={Name}
          onChangeHandler={(__, updatedValue) =>
            onChangeHandler('name', updatedValue)
          }
        />
      </FormGroup>

      <FormGroup>
        <Label>key</Label>
        <ControlledInput
          inputData={Key}
          onChangeHandler={(__, updatedValue) =>
            onChangeHandler('key', updatedValue)
          }
        />
      </FormGroup>
      <div className="separator mb-4 mt-4" />

      <FormGroup>
        <Label>Input Type</Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          value={Type.data.value || inputTypes[0]}
          onChange={(updatedVal) => onChangeHandler('type', updatedVal)}
          options={inputTypes}
        />
      </FormGroup>

      {Array.isArray(Options.data.value) && inputData.type.id !== 1 && (
        <Label>Value</Label>
      )}
      {Array.isArray(Options.data.value) &&
        inputData.type.id !== 1 &&
        Options.data.value.length === 0 && <div>No Field Found </div>}
      {Array.isArray(Options.data.value) && inputData.type.id !== 1 && (
        <ReactSortable
          list={Options.data.value}
          setList={(updatedList) => onChangeHandler('options', updatedList)}
          className="value"
          options={{
            handle: '.handle',
          }}
        >
          {Options.data.value.map((item) => {
            return (
              <FormGroup data-id={item.id} key={item.id} className="mb-1">
                <ControlledInput
                  inputData={{
                    id: item.id,
                    type: inputTypes[0],
                    data: {
                      key: 'key',
                      name: 'key',
                      options: '',
                      value: item.label,
                    },
                  }}
                  onChangeHandler={(inputEle, updatedVal) => {
                    const newOpntions = options.map((ele) => {
                      if (ele.id === inputEle.id) {
                        return { ...ele, label: updatedVal };
                      } else {
                        return ele;
                      }
                    });
                    onChangeHandler('options', newOpntions);
                  }}
                />

                <div className="input-icons">
                  <Badge className="handle" color="empty" pill>
                    <i className="simple-icon-cursor-move" />
                  </Badge>
                  <Badge
                    color="empty"
                    pill
                    onClick={() => {
                      console.log();
                      const newOpntions = options.filter(
                        (ele) => item.id !== ele.id
                      );
                      onChangeHandler('options', newOpntions);
                    }}
                  >
                    <i className="simple-icon-close" />
                  </Badge>
                </div>
              </FormGroup>
            );
          })}
        </ReactSortable>
      )}

      <div className="text-center">
        {type && type.id !== 1 && (
          <Button
            outline
            color="primary"
            className="mt-3"
            onClick={() => {
              const newOpntions = [
                ...options,
                defaultInputObj({ name: 'new cxzcxfield' }),
              ];
              onChangeHandler('options', newOpntions);
            }}
          >
            <i className="simple-icon-plus btn-group-icon" /> Add Input Value
          </Button>
        )}
      </div>
    </Form>
  );
};

export default EditMode;
