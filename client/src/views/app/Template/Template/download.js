import React, { useEffect, useRef, useState } from 'react';
// import htmlToPdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';

import 'react-tagsinput/react-tagsinput.css';
import {
  FormGroup,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Alert
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from '../../../../components/common/react-notifications';

import Editor from '../../snippets/Editor/index';
import filesTypes from '../../../../constants/filesTypes';

function downloadString({
  text = 'Empty File',
  fileName = new Date(),
  fileType = filesTypes[0],
  ext = '.txt'
}) {
  var blob = new Blob([text], { type: fileType });
  var a = document.createElement('a');
  a.download = `${fileName}.${ext}`;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

const Download = ({ dataRef, downloadModel, setDownloadModel }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState([]);
  const [body, setBody] = useState('');
  const nD = new Date();
  const DEFAULT_TITLE = `${nD.getFullYear()}${nD
    .getMonth()
    .toString()
    .padStart(2, 0)}${nD.getDay().toString().padStart(2, 0)}-templaty`;
  const DEFAULT_FILE_TYPE = filesTypes[0];

  const download = async () => {
    try {
      setLoading(true);
      const data = {
        text: body,
        fileName: title || DEFAULT_TITLE,
        fileType: fileType.value || DEFAULT_FILE_TYPE.value,
        ext: fileType.ext || DEFAULT_FILE_TYPE.ext
      };
      if (fileType.ext === 'html') {
        await downloadString(data);
      } else if (fileType.ext === 'pdf') {
        const parser = document.querySelector('.preview-html .ql-editor');
        var doc = new jsPDF('p', 'pt', 'a4');
        await doc.html(parser, {
          callback: function (pdf) {
            pdf.save(title || DEFAULT_TITLE);
          },
          x: 10,
          y: 10
        });
        // console.log(doc);
        // doc.save('sample-document.pdf');
      } else {
        data.text = body.replace(/<[^>]+>/g, '');
        await downloadString(data);
      }
      NotificationManager.success(
        'Success message',
        'File Downloaded Sucessfully',
        3000,
        null,
        null
      );
    } catch (e) {
      NotificationManager.error(
        'Success message',
        'File Was not Downloaded',
        3000,
        null,
        null
      );
    } finally {
      setLoading(false);
    }
  };

  // fetch
  const reset = () => {
    setTitle('');
    setLoading(false);
    setFileType([]);
    setBody('');
  };

  useEffect(() => {
    if (downloadModel) {
      const html = dataRef.current.innerHTML.replaceAll(
        'ql-placeholder-content',
        ''
      );
      setBody(html);
      setTitle(DEFAULT_TITLE);
      setFileType(DEFAULT_FILE_TYPE);
    } else {
      reset();
    }
  }, [downloadModel]);
  return (
    <Modal
      size="lg"
      isOpen={downloadModel}
      toggle={() => setDownloadModel(!downloadModel)}>
      <ModalHeader className=" email-header">
        <div className="w-100 d-flex justify-content-between">
          <IntlMessages id="download" />
          <div className="glyph" type="button" onClick={download}>
            <i className="glyph-icon iconsminds-download h4 text-primary mx-3" />
          </div>
        </div>
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }} className=".normal-style">
        <>
          {loading && <div className="loading" />}
          <h5 className="py-2">
            <b>File Name : </b>
            <span>{title || DEFAULT_TITLE}.</span>
            <span>{fileType.ext || DEFAULT_FILE_TYPE.ext}</span>
          </h5>
          <div className="d-flex">
            <FormGroup className="w-50 mr-2">
              <Input
                required
                type="text"
                value={title}
                placeholder="File Name"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="w-50 ml-2">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder="File Type"
                value={fileType}
                onChange={setFileType}
                options={filesTypes}
              />
            </FormGroup>
          </div>

          <FormGroup className="preview-html">
            <Editor value={body} setValue={setBody} />
          </FormGroup>
        </>

        <Button
          id="fdsdahflkdshiefwlu"
          onClick={download}
          color="primary"
          className={`btn-shadow  w-100 btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}>
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="download" />
          </span>
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default Download;
