import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import loginImg from "../images/signin.svg";
import { UserContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true  });
      alert("Login Successful");
      history.push("/");
    }
  };

  return (
    <section className="signup signin">
      <div className="rightsignup">
        <figure>
          <img src={loginImg} alt="signup" className="signupimage" />
        </figure>
        <p className="text-center mt-3 createaccount">
          <NavLink to="/signup">Create an Account</NavLink>
        </p>
      </div>

      <div className="leftsignup">
        <h2>Signin</h2>
        <div className="underline"></div>
        <form method="POST" className="reg-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="zmdi zmdi-email material-icons-name"></i>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              name="signup"
              id="signup"
              className="btn btn-primary form-submit"
              value="Signin"
              onClick={loginUser}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
