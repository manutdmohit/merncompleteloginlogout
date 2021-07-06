import React, { useState, useEffect } from "react";

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
      // console.log(data);
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
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/office/24/000000/iphone.png"
                      alt=""
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Phone</div>
                    <div className="contact_info_text">+977 9868 55 1045</div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png"
                      alt=""
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">saudmohit@gmail.com</div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png"
                      alt=""
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Address</div>
                    <div className="contact_info_text">
                      Tikapur-Kailali, Nepal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch </div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      name="name"
                      onChange={handleInputs}
                      placeholder="Your name"
                      required=""
                      value={userData.name}
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      name="email"
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required=""
                      value={userData.email}
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      placeholder="Your Phone Number"
                      onChange={handleInputs}
                      value={userData.phone}
                      required
                    />
                  </div>
                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      placeholder="Message"
                      cols="30"
                      rows="10"
                      onChange={handleInputs}dd
                      value={userData.message}
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="btn btn-primary"
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
