import React from "react";
import Footer from "../components/Footer";
import LoginHeader from "../components/LoginHeader";
import LoginBody from "../components/LoginBody";

const LoginLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <LoginHeader />
      <LoginBody />
      <Footer />
    </div>
  );
};

export default LoginLayout;
