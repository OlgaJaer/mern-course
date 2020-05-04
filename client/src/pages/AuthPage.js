import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
      //console.log("Error;" , error)
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("data", data);
    } catch (error) {} // обработано в useHttp
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>

        <div className="card indigo lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                  disabled={loading}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                  disabled={loading}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn orange darken-1" style={{ marginRight: 10 }}>
              Войти
            </button>
            <button
              className="btn amber lighten-4 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
