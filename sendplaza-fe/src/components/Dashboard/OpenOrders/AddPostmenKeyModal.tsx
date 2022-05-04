import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "components/Common/InputField";
import { addPostmenKeySchema } from "pages/App/validation";
import { yupResolver } from "@hookform/resolvers";
import SelectField from "components/Common/SelectField";

function AddPostmenKeyModal({
  showPostmenKeyModel,
  setReduxKey,
  createPostmenKeyAction,
}) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
    resolver: yupResolver(addPostmenKeySchema),
  });

  const onSubmit = (data) => {
    createPostmenKeyAction(data);
  };

  const onHide = () => {
    setReduxKey("showPostmenKeyModel", false);
  };
  return (
    <>
      {showPostmenKeyModel && (
        <Modal
          show={showPostmenKeyModel}
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
                      label={"Key"}
                      name="key"
                      ref={register()}
                      error={errors.key}
                    />
                  </Col>
                  <Col>
                    <SelectField
                      ref={register}
                      name="api_url"
                      error={errors.url}
                      label="Api url"
                      options={[
                        {
                          value: "https://sandbox-api.postmen.com/v3",
                          label: "Sanbox Url",
                        },
                        {
                          value: "https://production-api.postmen.com/v3",
                          label: "Production Url",
                        },
                      ]}
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

export default AddPostmenKeyModal;
