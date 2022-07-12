import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";
import { DB_URL } from "../../constants";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch(DB_URL + "login", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
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
        localStorage.setItem("accessToken", result.accessToken);
        alert("Logged in");
      })
      .catch((error) => {
        alert("Login fail!" + error);
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
