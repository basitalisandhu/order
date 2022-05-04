import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "components/Common/InputField";
import { addCredentialSchema } from "pages/App/validation";
import { yupResolver } from "@hookform/resolvers";

function AddCredentialModal({
  showCredentialModel,
  setReduxKey,
  createCredentialAction,
}) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
    resolver: yupResolver(addCredentialSchema),
  });

  const onSubmit = (data) => {
    createCredentialAction(data);
  };

  const onHide = () => {
    setReduxKey("showCredentialModel", false);
  };
  return (
    <>
      {showCredentialModel && (
        <Modal
          show={showCredentialModel}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Credential
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <InputField
                      label={"Name"}
                      name="name"
                      error={errors.name}
                      ref={register()}
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      label={"Client Id"}
                      name="client_id"
                      ref={register()}
                      error={errors.client_id}
                    />
                  </Col>
                  <Col md={12}>
                    <InputField
                      label={"Client Secret"}
                      name="client_secret"
                      error={errors.client_secret}
                      ref={register()}
                    />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" disabled={!formState.isValid}>
                Save
              </Button>
              <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default AddCredentialModal;
