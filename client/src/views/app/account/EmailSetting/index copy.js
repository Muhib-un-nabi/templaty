import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from 'availity-reactstrap-validation';

import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import { getSMTPS, setLoading, addSMTP } from '../../../../redux/SMTP/action';
import habdelGetData from '../../../../helpers/habdelGetData';

import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { adminRoot } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';

import EmailSettingFrom from './form';

const EmailSetting = ({
  match,
  user,
  history,
  getSMTPS,
  setLoading,
  addSMTP,

  smtp,
  loading
}) => {
  const [formModel, setFormModel] = useState(false);
  useEffect(() => {
    habdelGetData(getSMTPS, setLoading, history);
  }, []);

  const addNewSmtpAccount = async (data) => {
    try {
      await setLoading();
      await addSMTP(data);
      setFormModel(false);
    } catch {
      setLoading(false);
      setFormModel(false);
    }
  };
  const canAddSMTP = () => {
    return !smtp.filter((ele) => {
      return ele.user === user._id && ele.type !== 'team';
    }).length;
  };

  return (
    <>
      <EmailSettingFrom
        formModel={formModel}
        setFormModel={setFormModel}
        history={history}
        onSubmitHandler={addNewSmtpAccount}
      />
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.email-setting" />
            </h1>

            {user && !loading && canAddSMTP() && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setFormModel(true)}>
                  <IntlMessages id="setting.email-add" />
                </Button>
              </div>
            )}
            <Breadcrumb match={match} />
            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>

      <Row>
        <Colxx className="mb-4" xxs="12">
          <ul className="list-unstyled mb-4">
            {user &&
              smtp.map((smtp, i) => {
                const isUpdate = () => {
                  const isTeam = smtp.type === 'team';
                  const isAdmin = user.role === 'admin';
                  const isUser = user._id === smtp.user;
                  if (isTeam && isAdmin) return true;
                  if (!isTeam && isUser) return true;
                  if (isAdmin) return true;
                  else return false;
                };
                return (
                  <li key={smtp._id}>
                    <Card className="d-flex mb-4">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <b>{smtp.mail}</b>
                          </div>
                        </div>

                        {user.role === 'admin' &&
                          user._id === smtp.user &&
                          smtp.type !== 'team' && (
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <div className="w-15 w-xs-100">
                                <span className="badge badge-light  badge-pill">
                                  Personal
                                </span>
                              </div>
                            </div>
                          )}
                        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                          <div className="w-15 w-xs-100">
                            <span
                              className={`badge badge-${
                                smtp.type === 'team' ? 'primary' : 'secondary'
                              } badge-pill`}>
                              {smtp.type === 'team' ? 'Team' : 'Private'}
                            </span>
                          </div>
                        </div>

                        {isUpdate() && (
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className="icon-button ml-1"
                              // onClick={() => updateClick(itemData)}
                            >
                              <i className="simple-icon-pencil" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </li>
                );
              })}
          </ul>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ user: { user }, smtp: { smtp, loading } }) => ({
  user,
  smtp,
  loading
});

export default connect(mapStateToProps, { getSMTPS, setLoading, addSMTP })(
  EmailSetting
);
