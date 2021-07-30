/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Button,
  CardSubtitle,
  UncontrolledDropdown
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import { Quill } from 'react-quill';
const Delta = Quill.import('delta');
const Embed = Quill.import('blots/embed');
const Parchment = Quill.import('parchment');

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'] // remove formatting button,
];

const _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  const desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    const parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    const getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

class PlaceholderBlot extends Embed {
  static create(value) {
    let node = super.create(value);
    let {
      _id,
      name: Name,
      key = Name,
      defaultValue = '',
      visibility = true,
      type
    } = value;

    visibility = visibility ? 'team' : 'private';
    node.setAttribute('data-_id', _id);
    node.setAttribute('data-name', Name);
    node.setAttribute('data-key', key);
    node.setAttribute('data-type', type);
    node.setAttribute('data-defaultValue', defaultValue);
    node.setAttribute('data-visibility', visibility);
    node.setAttribute('spellcheck', false);
    node.setAttribute('contenteditable', false);
    node.classList.add(value.type);
    node.innerHTML = `<${value.type}
    spellcheck="false"
    contenteditable="false"
    data-_id="${_id}"
    data-name="${Name}"
    data-key="${key}"
    data-defaultValue="${defaultValue}"
    data-visibility="${visibility}"
    >{{${Name}}}</${type}>`;

    return node;
  }
  static value(domNode) {
    return domNode.dataset;
  }
  length() {
    return 1;
    // return this.domNode.innerText.length;
  }
  deleteAt(index, length) {
    if (!this.domNode.dataset.required)
      _get(
        PlaceholderBlot.prototype.__proto__ ||
          Object.getPrototypeOf(PlaceholderBlot.prototype),
        'deleteAt',
        this
      ).call(this, index, length);
  }
}

PlaceholderBlot.blotName = 'placeholder';
PlaceholderBlot.tagName = 'span';
PlaceholderBlot.className = 'ql-placeholder-content';

Quill.register(PlaceholderBlot);

class Placeholder {
  constructor(quill, options) {
    this.quill = quill;
    this.onTextChange = this.onTextChange.bind(this);
    this.quill.on(Quill.events.TEXT_CHANGE, this.onTextChange);
  }

  onTextChange(_, oldDelta, source) {
    if (source === Quill.sources.USER) {
      const currrentContents = this.quill.getContents();
      const delta = currrentContents.diff(oldDelta);
      const shouldRevert = delta.ops.filter(
        (op) =>
          op.insert && op.insert.placeholder && op.insert.placeholder.required
      ).length;
      if (shouldRevert) {
        this.quill.updateContents(delta, Quill.sources.SILENT);
      }
    }
  }

  onClick(ev) {
    const blot = Parchment.find(ev.target.parentNode);
    if (blot instanceof PlaceholderBlot) {
      const index = this.quill.getIndex(blot);
      this.quill.setSelection(index, blot.length(), Quill.sources.USER);
    }
  }
}

Quill.register('modules/placeholder', Placeholder);

//  React Component

let quill;

const addPlaceholder = (data) => {
  const range = quill.getSelection();
  if (!range || range.length !== 0) return;
  const position = (range && range.index) || 0;

  quill.insertEmbed(position, 'placeholder', data, Quill.sources.USER);
  quill.setSelection(position + 1);
};

const Index = ({ value, setValue, placeholderslist, contactslist }) => {
  const [placeholdersDropdown, setPlaceholdersDropdown] = useState(false);
  const [contactDropdown, setContactDropdown] = useState(false);
  const editorContainerRef = useRef();

  const removeVisibility = (ele) => ele.id !== 'visibility-input';
  // Adding Email Placeholder in insert-contact
  contactslist = [
    ...contactslist.filter(removeVisibility),
    {
      id: 'email',
      type: {
        label: 'Text Area',
        value: '1',
        id: 1
      },
      data: {
        key: 'ec09cxzcxzxcz-bf99-4c83-a94d-3a93e45c6043',
        name: 'Email',
        options: [],
        value: ''
      },
      chosen: false
    }
  ];
  useEffect(() => {
    editorContainerRef.current.innerHTML = '';
    quill = new Quill(editorContainerRef.current, {
      // debug: 'info',
      theme: 'snow',
      modules: { toolbar: toolbarOptions, placeholder: {} }
    });
    quill.clipboard.dangerouslyPasteHTML(0, value);
    quill.on('text-change', () => {
      setValue(quill.root.innerHTML);
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        {placeholderslist && (
          <Dropdown
            isOpen={placeholdersDropdown}
            toggle={() => setPlaceholdersDropdown(!placeholdersDropdown)}
            className="mb-5">
            <DropdownToggle caret color="secondary" outline>
              <IntlMessages id="inser.placeholders" />
            </DropdownToggle>
            <DropdownMenu>
              {(placeholderslist &&
                placeholderslist.map((placeholder) => (
                  <DropdownItem
                    key={placeholder._id}
                    onClick={(e) => {
                      e.preventDefault();
                      addPlaceholder({
                        type: 'placeholder',
                        ...placeholder
                      });
                    }}>
                    <span>{placeholder.name}</span>
                  </DropdownItem>
                ))) || <DropdownItem>No Placeholder is Found</DropdownItem>}
            </DropdownMenu>
          </Dropdown>
        )}
        {contactslist && (
          <Dropdown
            isOpen={contactDropdown}
            toggle={() => setContactDropdown(!contactDropdown)}
            className="mb-5">
            <DropdownToggle caret color="secondary" outline>
              <IntlMessages id="inser.contact" />
            </DropdownToggle>
            <DropdownMenu>
              {(contactslist &&
                contactslist.map((contact) => (
                  <DropdownItem
                    key={contact.id}
                    onClick={(e) => {
                      e.preventDefault();
                      addPlaceholder({
                        name: contact.data.name,
                        defaultValue: contact.data.value,
                        type: 'contact',
                        _id: contact.id
                      });
                    }}>
                    <span>{contact.data.name}</span>
                  </DropdownItem>
                ))) || <DropdownItem>No Contact is Found</DropdownItem>}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="editor" ref={editorContainerRef}></div>
    </div>
  );
};

export default Index;
