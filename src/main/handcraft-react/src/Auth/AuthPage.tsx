import React, { useState } from "react";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
const AuthPage: React.FC<{ register: boolean }> = (props) => {


  
  return (
    <div className="register-area ptb-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 col-md-6 col-12 p-0">
            <div className="back-pattern">
              <h1 className="pattern-welcome">
                Welcome to our application <br />
                Register & Login
              </h1>
            </div>
          </div>
          <div className="col-md-6 col-12 col-lg-5 col-xl-5 p-0">
            <div className="login">
              <div className="login-form-container">
                {props.register ? (
                  <Registration  />
                ) : (
                  <Login />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
