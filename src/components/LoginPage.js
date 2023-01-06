//THIS IS LOGIN PAGE

import React, { useEffect, useState } from "react";
import "../style/LoginPage.css";

const apiUrl = process.env.REACT_APP_URL + `/api`;

const LoginPage = (props) => {
  //Login Box Values
  const [pageState, setPageState] = useState("Login");
  const [changePage, setChangePage] = useState("Register Here");
  const [formState, setFormState] = useState("");
  // localStorage.removeItem("token");

  useEffect(() => {
    if (props.isLoggedIn) {
      window.location.href = "/";
    }
  }, [props]);

  useEffect(() => {
    if (pageState === "Login") {
      setFormState(<LoginForm />);
      setChangePage("Register Here");
    } else if (pageState === "Register") {
      setFormState(<RegisterForm />);
      setChangePage("Login Here");
    }
  }, [pageState]);

  const LoginForm = () => {
    const [invalidForm, setInvalidForm] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function LoginUser(e) {
      e.preventDefault();
      if (email !== "" && password !== "") {
        const response = await fetch(apiUrl + `/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        if (data.status === "ok") {
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        } else {
          setInvalidForm("Invalid Credentials");
        }
      } else if (email === "") {
        setInvalidForm("Please enter an Email!!");
      } else if (password === "") {
        setInvalidForm("Please enter a Password!!");
      }
    }
    useEffect(() => {
      setTimeout(() => {
        setInvalidForm("");
      }, 3000);
    }, [invalidForm]);
    return (
      <form className="LoginForm" onSubmit={(e) => LoginUser(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <div className="InvalidForm">{invalidForm}</div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const RegisterForm = () => {
    const [invalidForm, setInvalidForm] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function registerUser(e) {
      e.preventDefault();
      if (
        password === confirmPassword &&
        password !== "" &&
        email !== "" &&
        password.length > 3
      ) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        const response = await fetch(apiUrl + `/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        setPageState("");
        setChangePage("");
        setFormState(<div className="Registering">Registering User...</div>);
        if (data.status === "ok") {
          setFormState(<div className="Registering">User Registered!</div>);
          setChangePage("Back to Login");
        } else if (data.error.code === 11000) {
          setFormState(
            <div className="Registering">Email Already Registered!!</div>
          );
          setChangePage("Back to Login");
        } else {
          setFormState(<div className="Registering">Error Occured</div>);
          setChangePage("Back to Login");
        }
      } else if (email === "") {
        setInvalidForm("Please enter an Email!!");
      } else if (password === "") {
        setInvalidForm("Please enter a Password!!");
      } else if (password.length < 3) {
        setInvalidForm("Password cannot be smaller than 3 digits!!");
      } else if (confirmPassword === "") {
        setInvalidForm("Please confirm Password!!");
      } else {
        setInvalidForm("Passwords did not match!!");
      }
    }
    useEffect(() => {
      setTimeout(() => {
        setInvalidForm("");
      }, 3000);
    }, [invalidForm]);
    return (
      <form className="RegisterForm" onSubmit={(e) => registerUser(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter E-mail"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <div className="InvalidForm">{invalidForm}</div>
        <button type="submit">Register</button>
      </form>
    );
  };

  const handleClick = () => {
    if (pageState === "Login") {
      setPageState("Register");
      setChangePage("Login Here");
      setFormState(<RegisterForm />);
    } else {
      setPageState("Login");
      setChangePage("Register Here");
      setFormState(<LoginForm />);
    }
  };

  return (
    <div className="LoginPageContainer">
      <div className="LoginBox">
        <div className="LoginBoxHeader">{pageState}</div>
        {formState}
        <div className="LoginBoxButton" onClick={handleClick}>
          {changePage}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
