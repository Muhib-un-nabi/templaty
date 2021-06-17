/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React from 'react';
import { FormGroup, Input, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';
import inputType, { CHECKBOX, RADIO_BUTTON } from '../../constants/inputTypes';

const ControlledInput = ({
  inputData,
  onChangeHandler,
  placholder = 'Enter Value',
}) => {
  const { id, data, type } = inputData;
  let { key, name, options, value } = data;
  if (!type) return null;

  switch (type.label) {
    case CHECKBOX:
      return (
        <FormGroup data-key={key}>
          {options.map((option, index) => {
            return (
              <CustomInput
                key={option.id}
                data-index={index}
                type="checkbox"
                defaultChecked={(() => {
                  if (Array.isArray(value)) {
                    return value.some(
                      (ele) =>
                        ele.label === option.label && ele.id === option.id
                    );
                  }
                })()}
                id={`checkbox${id}_${option.id}`}
                name={`${id}`}
                data-name={name}
                label={option.label}
                onChange={(e) => {
                  let updatedValue = [];
                  // add
                  if (!Array.isArray(value)) value = [];

                  if (e.target.checked) {
                    updatedValue = [...value, option];
                    // remove
                  } else {
                    updatedValue = value.filter(
                      (ele) =>
                        ele.label !== option.label && ele.id !== option.id
                    );
                  }
                  onChangeHandler(inputData, updatedValue);
                }}
              />
            );
          })}
        </FormGroup>
      );
    case RADIO_BUTTON:
      return (
        <FormGroup data-key={key}>
          {options.map((option) => {
            return (
              <CustomInput
                key={option.id}
                type="radio"
                data-id={option.id}
                data-label={option.label}
                name={`${id}`}
                data-name={name}
                id={option.id}
                label={option.label}
                defaultChecked={(() => {
                  if (
                    value?.label &&
                    value.label === option.label &&
                    value.id === option.id
                  )
                    return true;
                  else return false;
                })()}
                onChange={() => {
                  const updatedValue = option;
                  onChangeHandler(inputData, updatedValue);
                }}
              />
            );
          })}
        </FormGroup>
      );
    default:
      return (
        <Input
          data-key={key}
          type="text"
          placeholder={placholder}
          value={value}
          name={`${id}`}
          data-name={name}
          onChange={(e) => {
            const updatedValue = e.target.value;
            onChangeHandler(inputData, updatedValue);
          }}
        />
      );
  }
};

ControlledInput.prototype = {
  inputData: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  placholder: PropTypes.string,
};

export const updateInputState = (prevState, value) => ({
  ...prevState,
  data: { ...prevState.data, value },
});

export const defaultInputObj = ({
  name = 'input Field',
  value = ' ',
  options = [],
  type = inputType[0],
  key = uuidV4(),
}) => ({
  id: uuidV4(),
  type,
  data: {
    key,
    name,
    options,
    value,
  },
});

export default ControlledInput;
