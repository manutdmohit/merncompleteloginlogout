import React, { useState, useEffect } from "react";

const Home = () => {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const userName = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUser(data.name);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userName();
  }, []);

  return (
    <>
      <div id="content">
        <p className="welcome">WELCOME</p>
        <h2>{user}</h2>
        <h2 className="content-heading">
          {show
            ? "Happy, To See You Back"
            : "The More You Code, The More You Learn"}
        </h2>
      </div>
      <div id="background"></div>
    </>
  );
};

export default Home;
