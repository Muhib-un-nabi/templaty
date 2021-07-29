/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */

import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';

import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import ThumbnailImage from '../../../../components/cards/ThumbnailImage';
import { adminRoot } from '../../../../constants/defaultValues';
import { getMe, setLoading } from '../../../../redux/user/action';
import Team from './team';
import IntlMessages from '../../../../helpers/IntlMessages';

import GradientWithRadialProgressCard from '../../../../components/cards/GradientWithRadialProgressCard';

const Account = ({
  intl,
  match,
  history,
  // Redux Data
  user,
  team,
  //Actions
  getMe,
  setLoading
}) => {
  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.account" />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() =>
                  history.push(`${adminRoot}/account/email-setting`)
                }>
                <IntlMessages id="setting.email-setting" />
              </Button>
            </div>
            <Breadcrumb match={match} />
            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>
      {/* You Have Remaining 50  */}
      {user && team && team.current && team.package && (
        <Row className="mb-4">
          <Colxx className="mb-4">
            <GradientWithRadialProgressCard
              icon="simple-icon-pencil"
              title={`${team.current.snippets} ${messages['menu.snippets']}`}
              detail={`${team.package.snippets - team.current.snippets} ${
                messages['menu.snippets']
              } ${messages['remaning']}`}
              percent={(team.current.snippets * 100) / team.package.snippets}
              progressText={`${team.current.snippets}/${team.package.snippets}`}
            />
          </Colxx>
          <Colxx className="mb-4">
            <GradientWithRadialProgressCard
              icon="simple-icon-people"
              title={`${team.current.contacts} ${messages['menu.contacts']}`}
              detail={`${team.package.contacts - team.current.contacts} ${
                messages['menu.contacts']
              } ${messages['remaning']}`}
              percent={(team.current.contacts * 100) / team.package.contacts}
              progressText={`${team.current.contacts}/${team.package.contacts}`}
            />
          </Colxx>
          <Colxx className="mb-4">
            <GradientWithRadialProgressCard
              icon="simple-icon-notebook"
              title={`${team.current.templates} ${messages['menu.templates']}`}
              detail={`${team.package.templates - team.current.templates} ${
                messages['menu.templates']
              } ${messages['remaning']}`}
              percent={(team.current.templates * 100) / team.package.templates}
              progressText={`${team.current.templates}/${team.package.templates}`}
            />
          </Colxx>
          <Colxx className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-clock"
              title={`${team.current.actions} ${messages['actions']}`}
              detail={`${team.package.actions - team.current.actions} ${
                messages['actions']
              } ${messages['remaning']}`}
              percent={(team.current.actions * 100) / team.package.actions}
              progressText={`${team.current.actions}/${team.package.actions}`}
            />
          </Colxx>
        </Row>
      )}

      {user && (
        <Row>
          <Team history={history} />
        </Row>
      )}
    </>
  );
};

const mapStateToProps = ({ user: { user, team } }) => ({
  user,
  team
});

export default connect(mapStateToProps, { getMe, setLoading })(
  injectIntl(Account)
);
