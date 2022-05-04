import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import InputField from "components/Common/InputField";
import SelectField from "components/Common/SelectField";
import countryCodes from "config/data/countryCodes";
import timezones from "config/data/timezones";
import { addShipperSchema } from "pages/App/validation";

function AddShipperModal({
  showShipperModel,
  setReduxKey,
  createShipperAction,
}) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
    resolver: yupResolver(addShipperSchema),
    // defaultValues: {
    //   description: "Bpost Phonecompleet",
    //   slug: "bpost",
    //   timezone: "Europe/Amsterdam",
    //   credentials: {
    //     account_number: "003642",
    //     passphrase: "secret",
    //     return_instructions: "return_by_air",
    //   },
    //   address: {
    //     country: "BEL",
    //     contact_name: "R Mohamad",
    //     phone: "0031620376842",
    //     email: "info@phonecompleet.nl",
    //     company_name: "P/A BX VNM - Phonecompleet",
    //     street1: "Vilvoordsesteenweg 233",
    //     city: "Brussel X",
    //     state: "Belgie",
    //     postal_code: "1099",
    //     type: "business",
    //   },
    // } as any,
  });

  const onSubmit = (data) => {
    createShipperAction(data);
  };

  const onHide = () => {
    setReduxKey("showShipperModel", false);
  };
  return (
    <>
      {showShipperModel && (
        <Modal
          show={showShipperModel}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Shipper
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <InputField
                      label={"Description"}
                      name="description"
                      error={errors.description}
                      ref={register()}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectField
                      ref={register}
                      name="slug"
                      label="Slug"
                      error={errors.slug}
                      options={[{ value: "bpost", label: "bpost" }]}
                    />
                  </Col>

                  <Col md={4}>
                    <SelectField
                      ref={register}
                      name="timezone"
                      error={errors.timezone}
                      label="Timezone"
                      options={timezones}
                    />
                  </Col>
                  <Col md={4}>
                    <InputField
                      label={"Account Number"}
                      name="credentials.account_number"
                      error={errors.credentials?.account_number}
                      ref={register()}
                    />
                  </Col>
                  <Col md={4}>
                    <InputField
                      label={"Passphrase"}
                      name="credentials.passphrase"
                      type="password"
                      error={errors.credentials?.passphrase}
                      ref={register()}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      ref={register}
                      name="credentials.return_instructions"
                      error={errors.credentials?.return_instructions}
                      label="Return Instructions"
                      options={[
                        {
                          value: "return_by_ground",
                          label: "Return by Ground",
                        },
                        { value: "return_by_air", label: "Return by air" },
                        { value: "abandoned", label: "Abandoned" },
                      ]}
                    />
                  </Col>

                  <Col md={4}>
                    <SelectField
                      label={"Country"}
                      name={`address.country`}
                      error={errors.address?.country}
                      defaultValue={"BEL"}
                      options={countryCodes}
                      opValue="alpha-3"
                      opLabel="name"
                      ref={register()}
                    />
                  </Col>
                  <Col md={4}>
                    <InputField
                      label={"Contact Name"}
                      name="address.contact_name"
                      ref={register()}
                    />
                  </Col>
                  <Col md={4}>
                    <InputField
                      label={"Phone"}
                      name="address.phone"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Fax"}
                      name="address.fax"
                      ref={register()}
                    />
                  </Col>
                  <Col md={4}>
                    <InputField
                      label={"Email"}
                      name="address.email"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Company Name"}
                      name="address.company_name"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Street Line 1"}
                      name="address.street1"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Street Line 2"}
                      name="address.street2"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Street Line 3"}
                      name="address.street3"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"City"}
                      name="address.city"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"State"}
                      name="address.state"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <InputField
                      label={"Postal Code"}
                      name="address.postal_code"
                      ref={register()}
                    />
                  </Col>

                  <Col md={4}>
                    <SelectField
                      ref={register}
                      name="address.type"
                      label="Type"
                      options={[
                        { value: "business", label: "Business" },
                        { value: "residential", label: "Residential" },
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

export default AddShipperModal;
