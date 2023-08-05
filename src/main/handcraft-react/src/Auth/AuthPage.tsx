import React, { useState } from "react";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
const AuthPage: React.FC<{ register: boolean }> = (props) => {
  return (
    <div className="register-area ptb-100">
          <div className="all-auth">
            <div className="login">
              <div className="login-form-container">
                {props.register ? <Registration /> : <Login />}
              </div>
            </div>
          </div>
    </div>
  );
};

export default AuthPage;
