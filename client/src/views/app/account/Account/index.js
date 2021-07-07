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
import ThumbnailImage from '../../../../components/cards/ThumbnailImage';
import { adminRoot } from '../../../../constants/defaultValues';
import { getMe, setLoading } from '../../../../redux/user/action';
import Team from './team';
import IntlMessages from '../../../../helpers/IntlMessages';

const Account = ({ match, user, history, getMe, setLoading }) => {
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

      {user && (
        <Row>
          <Colxx key={user._id} className="mb-4" md="6" sm="6" lg="4" xxs="12">
            <Card className="d-flex flex-row mb-4">
              <NavLink to={`${adminRoot}/cards`} className="d-flex">
                <ThumbnailImage
                  rounded
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  className="m-4"
                />
              </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <CardSubtitle className="truncate mb-1">
                      {user.name}
                    </CardSubtitle>
                    <CardText className="text-muted text-small mb-2">
                      Role: {user.role}
                    </CardText>
                    <CardText className="text-muted text-small mb-2">
                      Email: {user.email}
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Colxx>
        </Row>
      )}

      {user && user.role === 'admin' && (
        <Row>
          <Team history={history} />
        </Row>
      )}
    </>
  );
};

const mapStateToProps = ({ user: { user } }) => ({
  user
});

export default connect(mapStateToProps, { getMe, setLoading })(Account);
