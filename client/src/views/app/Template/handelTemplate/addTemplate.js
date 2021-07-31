/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Button,
  FormGroup,
  Label,
  Input,
  CustomInput
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import {
  setLoading,
  addTemplate,
  getTemplates,
  updateTemplate
} from '../../../../redux/template/action';
import habdelGetData from '../../../../helpers/habdelGetData';
import ReactAutoSuggest from '../../../../components/common/ReactAutoSuggest';

import { checkLimit } from '../../../../components/limit';

const AddTemplate = ({
  snippets,
  formVisible,
  setFormVisible,
  template,
  user,
  team,
  setModal,
  addTemplate,
  loading,
  setLoading,
  placeholders,
  getTemplates,
  history,
  updateTemplate
}) => {
  const [isvisible, setIsvisible] = useState(true);
  const [name, setName] = useState();
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    if (formVisible) {
      habdelGetData(getTemplates, setLoading, history);
    }
    setDataList(() => template.map((ele) => ({ name: ele.name })));
    setIsvisible(true);
    setName('');
  }, [formVisible]);

  const handelAddSnippet = async (e) => {
    try {
      if (!snippets.items.length) return;
      e.preventDefault();
      await setLoading();
      const newTemplate = {
        name,
        snippets: snippets.items.map((ele) => ele._id),
        visibility: isvisible,
        placeholders: placeholders.map(
          ({ name, value, defaultValue, _id }) => ({
            name,
            value: value || defaultValue,
            _id
          })
        )
      };
      const findExistingTemplate = template.find((ele) => ele.name === name);
      if (findExistingTemplate) {
        updateTemplate(newTemplate, findExistingTemplate._id);
      } else {
        checkLimit({
          cb: addTemplate,
          cbData: newTemplate,
          checkFor: 'templates',
          team
        });
      }

      await setFormVisible(false);
    } catch (e) {
      await setLoading(false);
    }
  };
  return (
    <Modal
      size="lg"
      isOpen={formVisible}
      toggle={() => setFormVisible(!formVisible)}>
      <ModalHeader>
        <IntlMessages id="template.add" />
      </ModalHeader>
      <ModalBody style={{ minHeight: '40vh' }}>
        {!snippets || !snippets.items.length ? (
          <div>Please Select Snippet for Saving Template</div>
        ) : (
          <>
            <FormGroup>
              <Label for="exampleEmail">
                Name <b>(if template name is same then template is updated) </b>
              </Label>
              {!loading && (
                <ReactAutoSuggest
                  value={name}
                  onChange={(val) => setName(val)}
                  data={dataList}
                />
              )}
            </FormGroup>

            <div className="m-2">
              <FormGroup>
                <Label>Visibility</Label>
                <CustomInput
                  key="private"
                  type="radio"
                  name="privacy"
                  id="private"
                  label="private"
                  onChange={(e) => setIsvisible(!e.target.checked)}
                  defaultChecked={!isvisible}
                />
                <CustomInput
                  key="team"
                  type="radio"
                  name="privacy"
                  id="team"
                  label="team"
                  onChange={(e) => setIsvisible(e.target.checked)}
                  defaultChecked={isvisible}
                />
              </FormGroup>
            </div>
            <div className="my-2">
              <h4 className="py-1">Placeholder List</h4>
              {placeholders.length !== 0 &&
                placeholders.map(({ _id, name, value, defaultValue }) => (
                  <div className="not-over-expand" key={_id}>
                    <Card className="d-flex mb-2 px-2 snippet-item ">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center p-1 ">
                          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span>
                              {name}: <b>{value || defaultValue}</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
            <div className="my-2">
              <h4 className="py-1">Snippet List</h4>
              {snippets.items.length !== 0 &&
                snippets.items.map((ele) => (
                  <div className="not-over-expand" key={ele?._id}>
                    <Card className="d-flex mb-2 px-2 snippet-item ">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center p-1 ">
                          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            {ele?.name}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </>
        )}
      </ModalBody>
      <Button
        onClick={handelAddSnippet}
        disabled={loading}
        color="primary"
        className={`btn-shadow m-4 btn-multiple-state ${
          loading ? 'show-spinner' : ''
        }`}>
        <span className="spinner d-inline-block">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </span>
        <span className="label">
          <IntlMessages id="template.add" />
        </span>
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({
  template: { template, loading },
  user: { user, team }
}) => ({
  template,
  user,
  loading,
  team
});

export default connect(mapStateToProps, {
  setLoading,
  addTemplate,
  getTemplates,
  updateTemplate
})(AddTemplate);
