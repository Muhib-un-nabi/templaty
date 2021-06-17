/* eslint-disable prettier/prettier */
/* eslint-disable one-var */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card } from 'reactstrap';
import { getPlaceholders } from '../../../../redux/placeholder/action';

import { Quill } from 'react-quill';
import getPlaceholderModule from 'quill-placeholder-module';
import getAutocompleteModule from 'quill-placeholder-autocomplete-module';
import Toolbar from './Toolbar';
import './index.css';
Quill.register(
  'modules/placeholder',
  getPlaceholderModule(Quill, {
    className: 'ql-placeholder-content'
  })
);
Quill.register('modules/autocomplete', getAutocompleteModule(Quill));

const Editor = ({ placeholders, getPlaceholders, value, setValue }) => {
  const [placeholderList, setPlaceholderList] = useState([]);

  useEffect(() => {
    getPlaceholders();
  }, []);

  useEffect(() => {
    if (!placeholders) return;
    const list = placeholders.map((ele) => ({ id: ele.name, label: ele.name }));
    setPlaceholderList(list);
  }, [placeholders]);

  useEffect(() => {
    if (!placeholders && !placeholderList) return;
    new Quill('#editor', {
      modules: {
        toolbar: { container: `#toolbar` },
        placeholder: {
          delimiters: ['{{', '}}'],
          placeholders: placeholderList
        },
        autocomplete: {
          getPlaceholders: () => placeholderList,
          triggerKey: '{',
          endKey: '}'
        }
      },
      theme: 'snow'
    });
  }, [placeholderList]);

  return (
    <Card>
      <Toolbar placeholderList={placeholderList} />
      <div id="editor"></div>
    </Card>
  );
};

const mapStateToProps = ({ placeholders: { placeholders } }) => ({
  placeholders
});

export default connect(mapStateToProps, { getPlaceholders })(
  injectIntl(Editor)
);
