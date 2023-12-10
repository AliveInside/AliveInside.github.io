import React, { FC } from "react";
import logo from "../assets/img/logo.svg";
import logo_text from "../assets/img/logo_text.png";

const LoginHeader: FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="" />
          <img src={logo_text} alt="" style={{ height: 100, width: 359 }} />
        </div>
      </div>
    </div>
  );
};
export default LoginHeader;
