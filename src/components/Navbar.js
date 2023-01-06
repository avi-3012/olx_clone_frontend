import React, { useEffect } from "react";
import "../style/Navbar.css";

//components
import LogoMain from "./NavbarComponents/LogoMain";
import Login from "./NavbarComponents/Login";
import Menu from "./NavbarComponents/Menu";

const Navbar = (props) => {
  const [menuData, setMenuData] = React.useState(<Login />);
  useEffect(() => {
    if (props.isLoggedIn) {
      setMenuData(<Menu email={props.email} />);
    } else {
      setMenuData(<Login />);
    }
  }, [props]);
  return (
    <section className="navbar">
      <LogoMain />
      {menuData}
    </section>
  );
};

export default Navbar;
