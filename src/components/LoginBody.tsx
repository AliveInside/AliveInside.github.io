import React, { FC } from "react";

const LoginBody: FC = () => {
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
        <a href="#" className="forget-password-button">
          Забыли пароль?
        </a>
      </div>
      <div>
        <button className="login-button">Вход</button>
      </div>
    </div>
  );
};
export default LoginBody;
