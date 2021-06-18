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

import React from 'react';
import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import ThumbnailImage from '../../../../components/cards/ThumbnailImage';
import { adminRoot } from '../../../../constants/defaultValues';

import Team from './team';

const Account = ({ match, user, history }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.account" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

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

      {user.role === 'admin' && (
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

export default connect(mapStateToProps)(Account);
