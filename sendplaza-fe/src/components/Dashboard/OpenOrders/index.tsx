import React, { useEffect } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import SelectField from "components/Common/SelectField";
import {
  AddCredentialContainer,
  AddPostmenKeyModalContainer,
  AddShipperContainer,
  OrderListContainer,
  SelectPostmenKeyContainer,
} from "pages/App/containers/dashboard";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "components/Common/Loader";
import {
  CREATE_CREDENTIAL,
  CREATE_SHIPPERS,
  DELETE_CREDENTIAL,
  DELETE_SHIPPERS,
  GET_ORDERS,
  GET_SHIPPERS,
} from "state/types";

// Then, use it in a component.
function OpenOrders({
  credential,
  shipper,
  postmenKey,
  shippers,
  orders,
  labels,
  credentials,
  getOrdersAction,
  getCredentialsAction,
  getShippersAction,
  getLabelsAction,
  deleteCredentialsAction,
  deleteShipperAction,
  setReduxKey,
}) {
  useEffect(() => {
    if (postmenKey) {
      if (credentials.length === 0) getCredentialsAction();
      if (shippers.length === 0) getShippersAction();
      if (labels.length === 0) getLabelsAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postmenKey]);

  const confirm = (performAction) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => performAction(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Row>
      <SelectPostmenKeyContainer />

      <Col md={12}>
        <Loader type={[GET_SHIPPERS, CREATE_SHIPPERS, DELETE_SHIPPERS]}>
          <Row>
            {postmenKey ? (
              <>
                <Col md={4}>
                  <SelectField
                    label={"Postmen Shipper"}
                    opValue="id"
                    opLabel="description"
                    placeholder={"Select Shipper"}
                    onChange={(e) => {
                      setReduxKey("shipper", e.target.value);
                    }}
                    value={shipper}
                    options={shippers}
                  />
                </Col>
                <Col md={4} className="pt-4 mt-2">
                  <Button
                    variant="danger"
                    onClick={() => confirm(deleteShipperAction)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    className="ml-3"
                    onClick={() => setReduxKey("showShipperModel", true)}
                  >
                    Add
                  </Button>
                </Col>
              </>
            ) : (
              <Col md={12} className="pt-3 text-center">
                <Alert variant="primary">
                  Select Postmen key to fetch shippers
                </Alert>
              </Col>
            )}
          </Row>
        </Loader>
      </Col>

      <Col md={12}>
        <Loader type={[CREATE_CREDENTIAL, DELETE_CREDENTIAL, GET_ORDERS]}>
          <Row>
            <Col md={4}>
              <SelectField
                label={"Bol Credential"}
                opValue="id"
                opLabel="name"
                onChange={(e) => {
                  setReduxKey("credential", e.target.value);
                  getOrdersAction();
                }}
                value={credential}
                placeholder={"Select Credential"}
                options={credentials}
              />
            </Col>
            <Col md={4} className="pt-4 mt-2">
              <Button
                variant="danger"
                onClick={() => confirm(deleteCredentialsAction)}
              >
                Delete
              </Button>
              <Button
                variant="success"
                className="ml-3"
                onClick={() => setReduxKey("showCredentialModel", true)}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Loader>
      </Col>

      <AddPostmenKeyModalContainer />

      <AddCredentialContainer />

      <AddShipperContainer />

      {shipper && credential ? (
        <>
          {/* <Col md={12} className="pt-3 pb-3 text-center">
            <Button className="ml-3" onClick={() => getOrdersAction()}>
              Fetch Orders
            </Button>
          </Col> */}
          <OrderListContainer />

          {orders.length % 50 === 0 && orders.length > 0 && (
            <Col md={12} className="pt-3 pb-3 text-center">
              <Button className="ml-3" onClick={() => getOrdersAction(true)}>
                Load More Orders
              </Button>
            </Col>
          )}
        </>
      ) : (
        <Col md={12} className="pt-3 text-center">
          <Alert variant="primary">
            Select Shipper and Credential to Fetch Orders
          </Alert>
        </Col>
      )}
    </Row>
  );
}

export default OpenOrders;
