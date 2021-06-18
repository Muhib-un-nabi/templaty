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

import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  NavLink,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  CustomInput,
  Collapse
} from 'reactstrap';
import { connect } from 'react-redux';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  getTeamDetails,
  deleteUserByAdmin,
  setLoading
} from '../../../../redux/user/action';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import ThumbnailImage from '../../../../components/cards/ThumbnailImage';
import ThumbnailLetters from '../../../../components/cards/ThumbnailLetters';

import { adminRoot } from '../../../../constants/defaultValues';

const Team = ({
  match,
  team,
  getTeamDetails,
  history,
  deleteUserByAdmin,
  setLoading,
  loading
}) => {
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState();
  const [deleteUserData, setDeleteUserData] = useState(false);
  const [asignTo, setAsignTo] = useState();
  useEffect(() => {
    try {
      setLoading();
      getTeamDetails();
    } catch (e) {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!team || !team.admin) return;
    setAsignTo(team.admin._id);
  }, [team]);

  useEffect(() => {
    if (modal) return;
    setDeleteUserData(false);
    setCurrent();
  }, [modal]);

  return (
    <>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>
          <IntlMessages id="modal.user-delete" />
        </ModalHeader>
        <ModalBody>
          <p>
            <IntlMessages id="modal.delete-user-message" />
          </p>
          <hr />
          {current && (
            <div>
              <p>
                Name : <b>{current.name}</b>
                <br />
                Email : <b>{current.email}</b>
              </p>
            </div>
          )}
          <hr />
          <FormGroup>
            <div>
              <CustomInput
                type="radio"
                id="delete-user-data"
                name="delete-user-data"
                label="Delete all user data"
                checked={deleteUserData}
                onChange={(e) => setDeleteUserData(e.target.checked)}
              />
              <CustomInput
                type="radio"
                id="asign-user-data"
                name="asign-user-data"
                label="Asign all user data"
                checked={!deleteUserData}
                onChange={(e) => setDeleteUserData(!e.target.checked)}
              />
            </div>
          </FormGroup>
          <Collapse isOpen={!deleteUserData}>
            <FormGroup>
              <div>
                {team &&
                  current &&
                  [team.admin, ...team.users]
                    .filter((ele) => ele._id !== current._id)
                    .map((ele) => (
                      <CustomInput
                        key={ele._id}
                        type="radio"
                        id={ele._id}
                        name="asign-to"
                        defaultChecked={(() => ele._id === team.admin._id)()}
                        onInput={(e) => setAsignTo(e.target.id)}
                        label={`${ele.name}`}
                      />
                    ))}
              </div>
            </FormGroup>
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              loading ? 'show-spinner' : ''
            }`}
            onClick={async (e) => {
              try {
                e.preventDefault();
                await setLoading();
                await deleteUserByAdmin(current._id, deleteUserData, asignTo);
              } catch (e) {
                await setLoading(false);
              } finally {
                setModal(false);
              }
            }}>
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">
              <IntlMessages id="button.delete-user" />
            </span>
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>

      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id="menu.team-details" />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-1"
              onClick={() => history.push(`${adminRoot}/account/user/add`)}>
              <IntlMessages id="button.user-add" />
            </Button>
          </div>
        </div>
      </Colxx>
      {team &&
        team.users &&
        [team.admin, ...team.users].map((user) => (
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
                    {user.role === 'user' && (
                      <Button
                        outline
                        size="xs"
                        onClick={() => {
                          setModal(true);
                          setCurrent(user);
                        }}
                        color="primary">
                        <IntlMessages id="user.user-delete" />
                      </Button>
                    )}
                  </div>
                </CardBody>
              </div>
            </Card>
          </Colxx>
        ))}
    </>
  );
};

const mapStateToProps = ({ user: { team, loading } }) => ({
  team,
  loading
});
export default connect(mapStateToProps, {
  getTeamDetails,
  deleteUserByAdmin,
  setLoading
})(Team);
