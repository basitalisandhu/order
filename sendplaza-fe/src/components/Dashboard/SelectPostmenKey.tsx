import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import SelectField from "components/Common/SelectField";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "components/Common/Loader";
import {
  CREATE_LABELS,
  CREATE_POSTMEN_KEY,
  DELETE_POSTMEN_KEY,
  GET_ORDERS,
} from "state/types";

// Then, use it in a component.
function SelectPostmenKey({
  postmenKeys,
  postmenKey,
  getPostmenKeysAction,
  deletePostmenKeyAction,
  setPostmenKeyAction,
  setReduxKey,
}) {
  useEffect(() => {
    if (postmenKeys.length === 0) getPostmenKeysAction();
  }, [getPostmenKeysAction, postmenKeys.length]);

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
    <Col md={12}>
      <Loader
        type={[
          CREATE_POSTMEN_KEY,
          DELETE_POSTMEN_KEY,
          GET_ORDERS,
          CREATE_LABELS,
        ]}
      >
        <Row>
          <Col md={4}>
            <SelectField
              label={"Postmen Key"}
              opValue="id"
              opLabel="name"
              onChange={(e) => {
                setPostmenKeyAction(e.target.value);
              }}
              value={postmenKey}
              options={postmenKeys}
            />
          </Col>
          <Col md={4} className="pt-4 mt-2">
            <Button
              variant="danger"
              onClick={() => confirm(deletePostmenKeyAction)}
            >
              Delete
            </Button>
            <Button
              variant="success"
              className="ml-3"
              onClick={() => setReduxKey("showPostmenKeyModel", true)}
            >
              Add
            </Button>
            {/* {postmenKey && (
              <Button className="ml-3" onClick={() => getShippersAction()}>
                Fetch Shippers
              </Button>
            )} */}
          </Col>
        </Row>
      </Loader>
    </Col>
  );
}

export default SelectPostmenKey;
