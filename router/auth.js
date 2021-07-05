const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello from the server");
});

//using promises
// router.post("/register"(req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "please fill the field properly" })
//     }

//     User.findOne({ email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already exists" })
//             }
//             const user = new User({ name, email, phone, work, password, cpassword });
//             user.save().then(() => {
//                 res.status(201).json({ message: "Registration Successful" })
//             }).catch((err) => res.status(500).json({ error: "Failed to register" }))
//         }).catch(err => console.log(err))
// })

// using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(400).json({ error: "Please fill the field properly" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password !== cpassword) {
      return res
        .status(401)
        .json({ error: "password and confirm password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Enter both email and passsword" });
    }

    const userExist = await User.findOne({ email });
    let token;

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userExist.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ message: "login successful" });
        console.log("Login Successful");
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }

    // if (userExist.password === password) {
    //     return res.status(200).json({ message: "login successful" })

    // return res.status(401).json({ error: "invalid credentials" })
  } catch (error) {
    console.log(error);
  }
});

// About Page
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
  res.send("This is about page");
  console.log("This is about page");
  console.log("After req.rootUser");
});

//Get User Data for Contact Page and Home Page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
  res.send("This is contact page");
  console.log("This is contact page");
  console.log("After req.rootUser");
});

//contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();
      res.status(201).json({ message: "user contact saved successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout page
router.get("/logout", (req, res) => {
  console.log("Hello my logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
