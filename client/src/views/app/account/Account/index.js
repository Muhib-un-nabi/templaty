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
import { Row } from 'reactstrap';
import { connect } from 'react-redux';

import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

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
      {user.role === 'admin' && (
        <Row>
          <Team history={history} />
        </Row>
      )}
    </>
  );
};

const mapStateToProps = ({ user: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(Account);
