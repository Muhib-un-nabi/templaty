/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import {
  Row,
  Button
  // CardSubtitle,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import useDidMountEffect from '../../../../hooks/useDidMountEffect';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { defaultInputObj } from '../../../../components/custom/ControlledInput';

import InputItem from './InputItem/index';

import {
  saveContactSetting,
  getInputField,
  setLoading
} from '../../../../redux/contacts/action';
import habdelGetData from '../../../../helpers/habdelGetData';

const ContactSetting = ({
  match,
  inputs: { custom, global },
  saveContactSetting,
  getInputField,
  loading,
  history,
  setLoading
}) => {
  const [customInput, setCustomInput] = useState(custom);
  const onChangeHandler = (updatedInput) =>
    setCustomInput((prevState) =>
      prevState.map((ele) => (ele.id === updatedInput.id ? updatedInput : ele))
    );

  // const [defauultInput, setDefauultInput] = useState(global)

  useEffect(() => {
    setCustomInput(custom);
  }, [custom]);

  useEffect(() => {
    habdelGetData(getInputField, setLoading, history);
  }, []);

  const saveSetting = async (e) => {
    try {
      e.preventDefault();
      setLoading();
      await saveContactSetting(customInput);
    } catch (e) {
      await setLoading(false);
    }
  };

  return (
    <>
      {/* <Prompt
            when={!isChanged}
            message={() => `Your Changes will not save. Are You Shure Want To leave this Page`}
          /> */}
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <Breadcrumb heading="menu.contacts-setting" match={match} />
            <div className="text-zero top-right-button-container">
              <Button
                disabled={loading}
                color="primary"
                onClick={saveSetting}
                className={`btn-shadow top-right-button mr-1 btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="sm">
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="button.save-changes" />
                </span>
              </Button>
            </div>
          </div>

          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {customInput.length !== 0 ? (
            <ul className="list-unstyled mb-4">
              <ReactSortable
                list={customInput}
                setList={(updatedList) => {
                  setCustomInput((prevstate) => updatedList);
                }}>
                {customInput.map((item, index) => (
                  <li data-id={item.id} key={item.id}>
                    <InputItem
                      inputdata={item}
                      onChangeHandler={onChangeHandler}
                      // updataInputItem={updataInputItem}
                      order={index}
                      // expanded={!item.title && true}
                      deleteClick={(id) => {
                        setCustomInput((state) =>
                          state.filter((ele) => ele.id !== id)
                        );
                      }}
                    />
                  </li>
                ))}
              </ReactSortable>
            </ul>
          ) : (
            <div>No Setting Field Found</div>
          )}
        </Colxx>
        <Colxx xxs="12" className="mb-4">
          <Button
            outline
            color="primary"
            block
            className="mb-2"
            onClick={() => {
              setCustomInput([...customInput, defaultInputObj({ name: '' })]);
            }}>
            Add New Field
          </Button>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ contacts: { inputs, loading } }) => ({
  inputs,
  loading
});

export default connect(mapStateToProps, {
  saveContactSetting,
  setLoading,
  getInputField
})(ContactSetting);
