import React from "react";
import "../../style/LogoMain.css";
import uploadImageLogo from "../../img/olxLogo.png";

const handleClick = () => (window.location.href = "/");

const LogoMain = () => {
  return (
    <div className="LogoMain" style={{ display: "flex", alignItems: "center" }}>
      <div
        onClick={() => {
          handleClick();
        }}
        className="mainLogo"
        style={{
          backgroundImage: `url(${uploadImageLogo})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "75%",
          width: "80px",
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

export default LogoMain;
