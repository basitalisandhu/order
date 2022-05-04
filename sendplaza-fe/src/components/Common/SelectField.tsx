import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { Form } from "react-bootstrap";

const SelectField: ForwardRefRenderFunction<any, any> = (
  { name, options, label, defaultValue, opValue, opLabel, error, ...props },
  ref
) => {
  opValue = opValue ? opValue : "value";
  opLabel = opLabel ? opLabel : "label";
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        custom
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        isInvalid={!!error}
        {...props}
      >
        <option disabled selected>
          -- select an option --
        </option>
        {options.map((option) => (
          <option
            key={option[opValue] ? option[opValue] : option}
            value={option[opValue] ? option[opValue] : option}
          >
            {option[opLabel] ? option[opLabel] : option}
          </option>
        ))}
      </Form.Control>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default forwardRef(SelectField);
