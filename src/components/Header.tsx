import React, { FC } from "react";
import logo from "../assets/img/logo.svg";
import logo_text from "../assets/img/logo_text.png";
import CustomPopup from "./CustomPopup";
import { TbLogout } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
// import { Link } from "react-router-dom";

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
            <CustomPopup>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Profile
                <FaUserDoctor style={{ height: 30, width: 30 }} />
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Logout
                <TbLogout
                  style={{ height: 30, width: 30, cursor: "pointer" }}
                />
              </span>
            </CustomPopup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
