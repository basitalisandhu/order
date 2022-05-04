import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";
import { dimension_unit, weight_unit } from "config/data";
import SelectField from "components/Common/SelectField";
import InputField from "components/Common/InputField";
import Items from "./Items";

function Parcels({ control, register, name }) {
  const { fields, append, remove } = useFieldArray({ control, name });
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h3>Parcels</h3>
        </div>
        <div>
          <Button variant="success" onClick={() => append({ dimension: {} })}>
            + Add
          </Button>
        </div>
      </div>
      {fields.map((field, index) => (
        <Row key={field.id} className="fieldArr-b">
          <Col md={12}>
            <Row>
              <Col md={6} className="d-flex mb-3">
                <h5>Parcel {index + 1}</h5>
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
            <Col md={6}>
              <InputField
                label={"Description"}
                name={`${name}[${index}].description`}
                defaultValue={field.description}
                ref={register()}
              />
            </Col>
            <Col md={6}>
              <SelectField
                label={"Box Type"}
                name={`${name}[${index}].box_type`}
                defaultValue={field.box_type}
                options={[{ value: "custom", label: "custom" }]}
                ref={register()}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <InputField
                label={"Box width"}
                type="number"
                name={`${name}[${index}].dimension.width`}
                defaultValue={field.dimension.width}
                onChange={(e) => {
                  return parseInt(e.target.value, 10);
                }}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={"Box height"}
                type="number"
                name={`${name}[${index}].dimension.height`}
                defaultValue={field.dimension.height}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={"Box depth"}
                type="number"
                name={`${name}[${index}].dimension.depth`}
                defaultValue={field.dimension.depth}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={3}>
              <SelectField
                label={"Box unit"}
                name={`${name}[${index}].dimension.unit`}
                defaultValue={field.dimension.unit}
                options={dimension_unit}
                ref={register()}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputField
                label={"Box weight"}
                type="number"
                name={`${name}[${index}].weight.value`}
                defaultValue={field.weight?.value}
                ref={register({ valueAsNumber: true })}
              />
            </Col>
            <Col md={6}>
              <SelectField
                label={"Box weight unit"}
                name={`${name}[${index}].weight.unit`}
                defaultValue={field.weight?.unit}
                options={weight_unit}
                ref={register()}
              />
            </Col>
          </Row>

          <Col md={12}>
            <Items
              control={control}
              register={register}
              name={`${name}[${index}].items`}
            />
          </Col>
        </Row>
      ))}
    </>
  );
}

export default Parcels;
