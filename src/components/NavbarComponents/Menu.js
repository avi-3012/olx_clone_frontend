import React, { useEffect } from "react";
import "../../style/Menu.css";

const Menu = (email) => {
  const [emailValue, setEmailValue] = React.useState("Username");
  const username = emailValue.email?.split("@")[0];
  useEffect(() => {
    setEmailValue(email);
  }, [email]);
  useEffect(() => {}, [username]);

  const handleHome = () => {
    window.location.href = "/";
  };
  const handleMyOrder = () => {
    window.location.href = "/account";
  };
  const handleSell = () => {
    window.location.href = "/sell";
  };
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="Menu">
      <div className="MenuValue" style={{ fontWeight: "bold" }}>
        {username}
        <div className="MenuItemContainer" style={{ fontWeight: "normal" }}>
          <div className="AccountName">{username}</div>
          <div className="MenuLine"></div>
          <div className="MenuItem">
            <div onClick={handleHome}>Home</div>
          </div>
          <div className="MenuItem">
            <div onClick={handleSell}>Sell</div>
          </div>
          <div className="MenuItem">
            <div onClick={handleMyOrder}>Account</div>
          </div>

          <div className="MenuItem">
            <div onClick={handleLogOut}>Log Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
