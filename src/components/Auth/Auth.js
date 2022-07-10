import React from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";

const Auth = () => {
  return (
    <div
      className="signin-background"
      style={{
        backgroundImage: "url(" + require("../../assets/background.png") + ")",
      }}
    >
      <div className="signin">
        <img src={logo} />
        <input placeholder="Username"></input>
        <input placeholder="Password"></input>
        <button className="btn-signin">Login</button>
      </div>
    </div>
  );
};

export default Auth;
