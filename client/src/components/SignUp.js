import React, { useState } from "react";
import signup from "../images/signup.svg";
import { NavLink, useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (
      res.status === 422 ||
      res.status === 400 ||
      res.status === 401 ||
      !data
    ) {
      alert("Registration Failed");
      console.log("registration failed");
    } else {
      alert("Registration Successful");
      console.log("registration successful");

      history.push("/login");
    }
  };

  return (
    <section className="signup">
      <div className="leftsignup">
        <h2>Sign UP</h2>
        <div className="underline mb-2" style={{ width: "8rem" }}></div>
        <form method="POST" className="reg-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="zmdi zmdi-account material-icons-name"></i>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              placeholder="Your Name"
              autoComplete="off"
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="zmdi zmdi-email material-icons-name"></i>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={user.email}
              placeholder="Your Email"
              autoComplete="off"
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              <i className="zmdi zmdi-phone material-icons-name"></i>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={user.phone}
              placeholder="Your Phone"
              autoComplete="off"
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label htmlFor="work">
              <i className="zmdi zmdi-slideshow material-icons-name"></i>
            </label>
            <input
              type="text"
              name="work"
              id="work"
              value={user.work}
              placeholder="Your Profession"
              autoComplete="off"
              onChange={handleInputs}
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
              value={user.password}
              placeholder="Password"
              autoComplete="off"
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">
              <i className="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              value={user.cpassword}
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              name="signup"
              id="signup"
              className="btn btn-primary form-submit"
              value="Register"
              onClick={PostData}
            />
          </div>
        </form>
      </div>
      <div className="rightsignup">
        <figure>
          <img src={signup} alt="signup" className="signupimage" />
        </figure>
        <p className="text-center mt-3 alreadyreg">
          <NavLink to="/login">I am already registered</NavLink>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
