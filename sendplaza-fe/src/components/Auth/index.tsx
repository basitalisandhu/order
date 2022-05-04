import React from "react";
import { useForm } from "react-hook-form";

function Auth({ loginAction }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    loginAction(data.username, data.password);
  };
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                ref={register}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                ref={register}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
