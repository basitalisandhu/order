import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";
import { weight_unit } from "config/data";
import SelectField from "components/Common/SelectField";
import InputField from "components/Common/InputField";
import countryCodes from "config/data/countryCodes";

function Items({ control, register, name }) {
  const { fields, append, remove } = useFieldArray({ control, name });
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h3>Items</h3>
        </div>
        <div>
          <Button
            variant="success"
            onClick={() => append({ price: {}, weight: {} })}
          >
            + Add
          </Button>
        </div>
      </div>
      {fields.map((field, index) => (
        <Row key={field.id} className="fieldArr-b">
          <Col md={12}>
            <Row>
              <Col md={6} className="d-flex mb-3">
                <h5>Item {index + 1}</h5>
                <Button
                  className="ml-3"
                  variant="danger"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </Col>
          <Row>
            <Col md={12}>
              <InputField
                label={"Description"}
                name={`${name}[${index}].description`}
                defaultValue={field.description}
                ref={register()}
              />
            </Col>
            <Col md={4}>
              <InputField
                type="number"
                label={"Quantity"}
                name={`${name}[${index}].quantity`}
                defaultValue={field.quantity}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={"Price"}
                type="number"
                name={`${name}[${index}].price.amount`}
                defaultValue={field.price.amount}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={"Currency"}
                name={`${name}[${index}].price.currency`}
                defaultValue={field.price.currency}
                options={[
                  { value: "USD", label: "USD" },
                  { value: "EUR", label: "EUR" },
                ]}
                ref={register()}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <SelectField
                label={"Origin Country"}
                name={`${name}[${index}].origin_country`}
                defaultValue={field.origin_country}
                options={countryCodes}
                opValue="alpha-3"
                opLabel="name"
                ref={register()}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={"weight"}
                type="number"
                name={`${name}[${index}].weight.value`}
                defaultValue={field.weight.value}
                step="0.0001"
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={"weight unit"}
                name={`${name}[${index}].weight.unit`}
                defaultValue={field.weight.unit}
                options={weight_unit}
                ref={register()}
              />
            </Col>
          </Row>
        </Row>
      ))}
    </>
  );
}

export default Items;
