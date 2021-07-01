/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import { Quill } from 'react-quill';

let quill;
const Index = ({ value, setValue, placeholderslist, contactslist }) => {
  const [placeholdersDropdown, setPlaceholdersDropdown] = useState(false);
  const editorContainerRef = useRef();
  useEffect(() => {
    quill = new Quill(editorContainerRef.current, {
      // debug: 'info',
      theme: 'snow'
    });
    quill.clipboard.dangerouslyPasteHTML(0, value);
    quill.on('text-change', () => {
      setValue(quill.root.innerHTML);
    });
  }, [placeholderslist]);

  return (
    <div>
      <div className="d-flex justify-content-between">
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
                    console.log(quill);
                    e.preventDefault();
                    // console.log(quill);
                    // console.log(quill?.clipboard);
                    quill.clipboard.dangerouslyPasteHTML(
                      10,
                      ` <b style="content:'${placeholder.name}'">{{${placeholder.name}}}</b> `
                    );
                  }}>
                  <span>{placeholder.name}</span>
                </DropdownItem>
              ))) || <div>No Placeholder is Found</div>}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="editor" ref={editorContainerRef}></div>
    </div>
  );
};

export default Index;
