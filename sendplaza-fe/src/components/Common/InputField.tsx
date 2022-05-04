import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { Form } from "react-bootstrap";

const InputField: ForwardRefRenderFunction<any, any> = (
  { name, type, label, defaultValue, error, ...props },
  ref
) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type ? type : "text"}
        placeholder={label}
        ref={ref}
        defaultValue={defaultValue}
        name={name}
        isInvalid={!!error}
        {...props}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default forwardRef(InputField);
