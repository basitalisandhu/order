import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { paper_options, service_type_options } from "config/data";
import SelectField from "components/Common/SelectField";
import Parcels from "components/Dashboard/EditRecord/Parcels";
import InputField from "components/Common/InputField";
import countryCodes from "config/data/countryCodes";

function EditOrderModal({ order, show, onHide, editOrderAction }) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: JSON.parse(JSON.stringify(order.label)),
  });

  const onSubmit = (data) => {
    editOrderAction(order.orderId, data);
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Label Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col md={3}>
                <InputField
                  label={"Order Number"}
                  name={`order_number`}
                  ref={register()}
                />
              </Col>
              <Col md={3}>
                <SelectField
                  ref={register}
                  name="paper_size"
                  label="Paper Size"
                  options={paper_options}
                />
              </Col>
              <Col md={3}>
                <SelectField
                  ref={register}
                  name="service_type"
                  label="Service Type"
                  options={service_type_options}
                />
              </Col>

              <Col md={3}>
                <SelectField
                  ref={register}
                  name="billing.paid_by"
                  label="Paid By"
                  options={[
                    { value: "shipper", label: "Shipper" },
                    { value: "recipient", label: "Recipient" },
                    { value: "third_party", label: "Third Party" },
                  ]}
                />
              </Col>

              <Col md={3}>
                <SelectField
                  ref={register}
                  name="customs.purpose"
                  label="Purpose"
                  options={[
                    { value: "gift", label: "Gift" },
                    { value: "merchandise", label: "Merchandise" },
                    { value: "personal", label: "Personal" },
                    { value: "sample", label: "Sample" },
                    { value: "return", label: "Return" },
                    { value: "repair", label: "Repair" },
                  ]}
                />
              </Col>
              <Col md={12}>
                <h3>Address</h3>
              </Col>

              <Col md={3}>
                <InputField
                  label={"City"}
                  name={`shipment.ship_to.city`}
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <InputField
                  label={"Company Name"}
                  name={`shipment.ship_to.company_name`}
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <InputField
                  label={"Contact Name"}
                  name={`shipment.ship_to.contact_name`}
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <InputField
                  label={"Email"}
                  name={`shipment.ship_to.email`}
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <InputField
                  label={"Postal Code"}
                  name={`shipment.ship_to.postal_code`}
                  ref={register()}
                />
              </Col>

              <Col md={12}>
                <InputField
                  label={"Street1"}
                  name={`shipment.ship_to.street1`}
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <SelectField
                  label={"Country"}
                  name={`shipment.ship_to.country`}
                  options={countryCodes}
                  opValue="alpha-3"
                  opLabel="name"
                  ref={register()}
                />
              </Col>

              <Col md={3}>
                <SelectField
                  ref={register}
                  name="shipment.ship_to.type"
                  label="Type"
                  options={[
                    { value: "business", label: "Business" },
                    { value: "residential", label: "Residential" },
                  ]}
                />
              </Col>

              <Col md={12}>
                <Parcels
                  control={control}
                  register={register}
                  name="shipment.parcels"
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Save</Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditOrderModal;
