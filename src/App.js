import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

//components
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import ListProducts from "./components/ListProducts";
import SellPage from "./components/SellPage";
import Account from "./components/Account";

const apiUrl = process.env.REACT_APP_URL + `/api`;

function App() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function verifyLogin() {
    const req = await fetch(apiUrl + `/users/verify`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json();
    return data;
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        verifyLogin().then((res) => {
          setEmail(res.email);
          if (res.status === "ok") {
            if (email !== "") {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          } else {
            localStorage.removeItem("token");
          }
        });
      }
    }
  }, [email]);

  // console.log(isLoggedIn, email);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} email={email} />
      <Switch>
        <Route path="/" exact>
          <ListProducts isLoggedIn={isLoggedIn} email={email} />
        </Route>
        <Route path="/sell">
          <SellPage isLoggedIn={isLoggedIn} email={email} />
        </Route>
        <Route path="/account">
          <Account isLoggedIn={isLoggedIn} email={email} />
        </Route>
        <Route path="/login">
          <LoginPage isLoggedIn={isLoggedIn} email={email} />
        </Route>
        <Route path="*">
          <div
            style={{
              padding: "8rem",
              fontSize: "40px",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            Page Don't Exist
            <div
              style={{
                margin: "2rem",
                fontSize: "18px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/")}
            >
              HOME
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
