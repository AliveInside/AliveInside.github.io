import React, { FC } from "react";
import { KDC_URL } from "../KDC_URL";
import axios from "axios";

const LoginBody: FC = () => {
  const handleLogin = async (body: { snils: string; userPassword: string }) => {
    try {
      const apiUrl = `${KDC_URL}/api/v1/user/login`;
      const { data, status } = await axios.post(apiUrl, body);
      if (status !== 200) {
        return;
      }

      console.log(data);
      console.log(status);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="centered-window">
      <h2 className="entry-text">Вход в панель администратора </h2>
      <div>
        <h2 className="default-text">Логин</h2>
        <input className="input-container" placeholder="Введите логин" />
      </div>
      <div>
        <h2 className="default-text">Пароль</h2>
        <input className="input-container" placeholder="Введите пароль" />
      </div>
      <div className="forget-password">
        {/* <a href="#" className="forget-password-button">
          Забыли пароль?
        </a> */}
      </div>
      <div>
        <button
          className="login-button"
          onClick={() =>
            handleLogin({ snils: "29505375092", userPassword: "qwerty123" })
          }
        >
          Вход
        </button>
      </div>
    </div>
  );
};
export default LoginBody;
