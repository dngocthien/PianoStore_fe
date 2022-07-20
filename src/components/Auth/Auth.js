import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";
import { DB_URL } from "../../constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    fetch(DB_URL + "login", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.status);
      })
      .then((result) => {
        // localStorage.setItem("access_token", result.access_token);
        dispatch({ type: "LOGIN", token: result.access_token });
        navigate("/admin");
      })
      .catch((error) => {
        alert("Login failed!");
      });
  }

  return (
    <div
      className="signin-background"
      style={{
        backgroundImage: "url(" + require("../../assets/background.png") + ")",
      }}
    >
      <div className="signin">
        <img src={logo} />
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="btn-signin" onClick={() => login()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
