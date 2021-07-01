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
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Card } from 'reactstrap';

import { Quill } from 'react-quill';
import getPlaceholderModule from 'quill-placeholder-module';
import getAutocompleteModule from 'quill-placeholder-autocomplete-module';
import './index.css';
Quill.register(
  'modules/placeholder',
  getPlaceholderModule(Quill, {
    className: 'ql-placeholder-content'
  })
);
Quill.register('modules/autocomplete', getAutocompleteModule(Quill));
const Editor = ({ value, setValue, placeholderslist, contactslist }) => {
  placeholderslist = placeholderslist.map((ele) => ({
    id: ele.name,
    label: ele.name
  }));

  useEffect(() => {
    if (!placeholderslist) return;
    const quill = new Quill('#editor', {
      modules: {
        toolbar: { container: `#toolbar` },
        placeholder: {
          delimiters: ['{{', '}}'],
          placeholders: placeholderslist
        },
        autocomplete: {
          getPlaceholders: () => placeholderslist,
          triggerKey: '{',
          endKey: '}'
        }
      },
      theme: 'snow'
    });
    quill.clipboard.dangerouslyPasteHTML(0, value);
    quill.on('text-change', () => {
      setValue(quill.root.innerHTML);
    });
  }, []);

  return (
    <Card>
      <div id="toolbar">
        <span className="ql-formats">
          <select className="ql-header" defaultValue="">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value=""></option>
          </select>
          <select className="ql-font" defaultValue=""></select>
          <select className="ql-size" defaultValue="">
            <option value="small"></option>
            <option value=""></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
          <button className="ql-blockquote"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-placeholder">
            {placeholderslist.map((ele, i) => (
              <option key={i} value={ele.label}>
                {ele.label}
              </option>
            ))}
          </select>
        </span>
      </div>
      <div id="editor"></div>
    </Card>
  );
};

export default injectIntl(Editor);
