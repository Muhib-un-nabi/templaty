import React from 'react';

const Toolbar = ({ placeholderList = [] }) => {
  return (
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
          {placeholderList.map((ele, i) => (
            <option key={i} value={ele.label}>
              {ele.label}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default Toolbar;
