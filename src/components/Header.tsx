import React, { FC } from "react";
import logo from "../assets/img/logo.svg";
import logo_text from "../assets/img/logo_text.png";
import settings from "../assets/img/settings.svg";

const Header: FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="" />
          <img src={logo_text} alt="" style={{ height: 100, width: 359 }} />
        </div>
        <div className="header__right">
          <div className="user">Здравствуйте, я незапланированный</div>
          <div className="settings" style={{ marginTop: 10 }}>
            <img src={settings} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
