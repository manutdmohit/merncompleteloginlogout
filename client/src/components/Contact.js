import React, { useState, useEffect } from "react";
import phone from "../images/phone.png";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  // sending data to the backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();
    if (!data) {
      console.log("Message not send");
    } else {
      alert("Message Sent Successfully");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact_info mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phonenumber */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src={phone} alt="phone" id="contact_img" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+977 9868 55 1045</div>
                </div>
              </div>

              {/* email */}

              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/bubbles/50/000000/email--v1.png"
                  alt="email"
                  id="contact_img"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text" id="contact_img">
                    saudmohit@gmail.com
                  </div>
                </div>
              </div>

              {/* Address */}

              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/cute-clipart/64/000000/address.png"
                  alt="address"
                  id="contact_img"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Nepal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}

      <div className="contact_form my-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between my-3">
                    <input
                      type="text"
                      id="contact_form_name"
                      name="name"
                      className="contact_form_name"
                      onChange={handleInputs}
                      placeholder="Your Name"
                      value={userData.name}
                      required="true"
                    />
                    <div className="contact_form_email">
                      <input
                        type="email"
                        id="contact_form_email"
                        name="email"
                        className="contact_form_email"
                        onChange={handleInputs}
                        placeholder="Your Email"
                        value={userData.email}
                        required="true"
                      />
                    </div>
                    <div className="contact_form_phone">
                      <input
                        type="number"
                        id="contact_form_phone"
                        name="phone"
                        className="contact_form_phone"
                        onChange={handleInputs}
                        placeholder="Your Phone"
                        value={userData.phone}
                        required="true"
                      />
                    </div>
                  </div>
                  <div className="message mt-5">
                    <textarea
                      name="message"
                      id="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <div className="contact_form_button mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary button_contact"
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
