//THIS IS FOR LOGIN BUTTON

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Login.css";

//Toggle login page and back button
const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [loginValue, setLoginValue] = useState("LOGIN");
  const [loginUrl, setLoginUrl] = useState("/login");
  const handleClick = () => {
    if (isLoginPage) {
      setLoginValue("LOGIN");
      setLoginUrl("/login");
      setIsLoginPage(false);
    } else {
      setLoginValue("BACK");
      setLoginUrl("/");
      setIsLoginPage(true);
    }
  };
  return (
    <div className="loginContainer">
      <Link
        className="login"
        to={loginUrl}
        onClick={handleClick}
        style={{ textDecoration: "none", fontWeight: "bold" }}
      >
        {loginValue}
      </Link>
    </div>
  );
};

export default Login;
