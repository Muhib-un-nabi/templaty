import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardTitle,
  CardHeader,
  TabContent,
  TabPane,
  Nav,
  NavItem
} from 'reactstrap';

import classnames from 'classnames';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import {
  getSMTPS,
  setLoading,
  addORupdateSMTP
} from '../../../../redux/SMTP/action';
import habdelGetData from '../../../../helpers/habdelGetData';

import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';

import EmailSettingFrom from './form';

const EmailSetting = ({
  match,
  user,
  team,

  history,
  getSMTPS,
  setLoading,
  addORupdateSMTP,

  smtp,
  loading
}) => {
  const [activeTab, setActiveState] = useState('1');
  const defaault = { port: 465 };
  const [teamSMTPdefaultValues, setTeamSMTPdefaultValues] = useState();
  const [userSMTPdefaultValues, setUserSMTPdefaultValues] = useState();
  const [isUpdateValue, setIsUpdateValue] = useState(false);

  const [isTeam, setIsTeam] = useState(false);
  useState(() => {
    if (team && team.package) {
      setIsTeam(team.package.team);
    }
  }, [team]);

  useEffect(() => {
    if (smtp && smtp.length !== 0) {
      const user = smtp.find((ele) => ele.type === 'user');
      user &&
        setUserSMTPdefaultValues({
          ...user
        });
      const team = smtp.find((ele) => ele.type === 'team');
      team &&
        setTeamSMTPdefaultValues({
          ...team
        });
      setIsUpdateValue(true);
    }
    if (!loading && smtp.length === 0) {
      setTeamSMTPdefaultValues(defaault);
      setUserSMTPdefaultValues(defaault);
      setIsUpdateValue(true);
    }
  }, [smtp]);

  useEffect(() => {
    habdelGetData(getSMTPS, setLoading, history);
  }, []);

  const addNewSmtpAccount = async (data) => {
    try {
      setIsUpdateValue(false);
      await setLoading();
      await addORupdateSMTP(data);
    } catch {
      setLoading(false);
      setIsUpdateValue(true);
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.email-setting" />
            </h1>
            <Breadcrumb match={match} />
            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>
      {(user && !loading && (
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4 min-h-70vh">
              <CardHeader className="pl-0 pr-0">
                <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                  <NavItem className="w-50 text-center">
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeTab === '1',
                        'nav-link': true
                      })}
                      onClick={() => {
                        setActiveState('1');
                      }}>
                      <IntlMessages id="smtp.user" />
                    </NavLink>
                  </NavItem>
                  {isTeam && (
                    <NavItem className="w-50 text-center">
                      <NavLink
                        to="#"
                        location={{}}
                        className={classnames({
                          active: activeTab === '2',
                          'nav-link': true
                        })}
                        onClick={() => {
                          setActiveState('2');
                        }}>
                        <IntlMessages id="smtp.team" />
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          <IntlMessages id="smtp.configre" />
                        </CardTitle>
                        {isUpdateValue && (
                          <EmailSettingFrom
                            history={history}
                            onSubmitHandler={addNewSmtpAccount}
                            defaultValues={userSMTPdefaultValues}
                          />
                        )}
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                {isTeam && (
                  <TabPane tabId="2">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <CardTitle className="mb-4">
                            {(user.role === 'admin' && (
                              <IntlMessages id="smtp.configre" />
                            )) || (
                              <>
                                <IntlMessages id="smtp.team" />{' '}
                                <b>
                                  {' '}
                                  (<IntlMessages id="readonly" />)
                                </b>
                              </>
                            )}
                          </CardTitle>
                          {isUpdateValue && (
                            <EmailSettingFrom
                              history={history}
                              onSubmitHandler={addNewSmtpAccount}
                              defaultValues={teamSMTPdefaultValues}
                              SMTPfor="team"
                            />
                          )}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                )}
              </TabContent>
            </Card>
          </Colxx>
        </Row>
      )) || <div className="loading" />}
    </>
  );
};

const mapStateToProps = ({
  user: { user, team },
  smtp: { smtp, loading }
}) => ({
  user,
  team,
  smtp,
  loading
});

export default connect(mapStateToProps, {
  getSMTPS,
  setLoading,
  addORupdateSMTP
})(EmailSetting);
