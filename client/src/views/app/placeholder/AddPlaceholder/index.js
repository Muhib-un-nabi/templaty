/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormText,
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { v4 as uuidV4, v4 } from 'uuid';

import { injectIntl } from 'react-intl';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';

import ControlledInput from '../../../../components/custom/ControlledInput';
import { addPlaceholder } from '../../../../redux/placeholder/action';

const index = ({ match, intl, addPlaceholder, history, input: { global } }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [value, setvalue] = useState('');
  const fields = [
    {
      id: 'name-input',
      type: {
        label: 'Text Area',
        value: '1',
        id: 1
      },
      data: {
        key: 'name',
        name: 'Name',
        options: [],
        value: ' '
      },
      chosen: false
    },
    {
      id: '19b9c7de-aa7a-4401-b90a-1fd9f7d83029',
      type: {
        label: 'Text Area',
        value: '1',
        id: 1
      },
      data: {
        key: 'key',
        name: 'Key',
        options: [],
        value: v4()
      },
      chosen: false
    },
    {
      id: 'default-value',
      type: {
        label: 'Text Area',
        value: '1',
        id: 1
      },
      data: {
        key: 'value',
        name: 'Value ( default )',
        options: [],
        value: ' '
      },
      chosen: false
    },
    {
      id: 'category',
      type: {
        label: 'Text Area',
        value: '1',
        id: 1
      },
      data: {
        key: 'category',
        name: 'Category',
        options: [],
        value: ' '
      },
      chosen: false
    },
    {
      id: 'visibility-input',
      type: {
        label: 'Radiobutton',
        value: '3',
        id: 3
      },
      data: {
        key: 'visibility',
        name: 'Visibility',
        options: [
          {
            id: 'team',
            type: {
              label: 'Text Area',
              value: '1',
              id: 1
            },
            data: {
              key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
              name: 'new Field',
              options: [],
              value: ' '
            },
            chosen: false,
            selected: false,
            label: 'Team'
          },
          {
            id: 'private',
            type: {
              label: 'Text Area',
              value: '1',
              id: 1
            },
            data: {
              key: 'dfd98dfe-20b5-40ff-a75d-d0f53f00a094',
              name: 'new cxzcxfield',
              options: [],
              value: ' '
            },
            chosen: false,
            label: 'Private'
          }
        ],
        value: {
          id: 'team',
          type: {
            label: 'Text Area',
            value: '1',
            id: 1
          },
          data: {
            key: '606f033b-a2f9-4bdc-a3f3-efb9909e05d2',
            name: 'new Field',
            options: [],
            value: ' '
          },
          chosen: false,
          selected: false,
          label: 'Team'
        }
      },
      chosen: false
    }
  ];
  const [Fields, setFields] = useState(fields);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const newPlaceholders = {
        name,
        key,
        defaultValue: value
        // visibility:
        //   Fields.find((ele) => ele.id === 'visibility-input').data.value.id ===
        //   'team'
      };
      //     category: Fields.find((ele) => ele.id === 'category').data.value.split(
      //     ','
      //   ),
      // await addPlaceholder(newPlaceholders);
      history.push(`${adminRoot}/placeholders/all`);
    } catch (e) {
      console.log(e);
    }
  };

  const makeKey = (string) => {
    return string.toString().toLocaleLowerCase().replaceAll(' ', '-');
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.placeholders-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      setKey('');
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Key</Label>
                  <Input
                    type="text"
                    value={makeKey(key) || makeKey(name)}
                    name="key"
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Value (default)</Label>
                  <Input
                    type="text"
                    value={value}
                    name="value"
                    onChange={(e) => {
                      setvalue(e.target.value);
                    }}
                  />
                </FormGroup>

                <Button color="primary" className="mt-4">
                  <IntlMessages id="form.addPlaceholder" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ contacts: { inputs } }) => ({
  inputs
});

export default connect(mapStateToProps, { addPlaceholder })(injectIntl(index));
