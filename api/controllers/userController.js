const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  console.log("-=-=");
  const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
      user: process.env.Email,
      pass: process.env.PASS,
    },
  });
  console.log("-=-=");
  const mailOptions = {
    from: "bazar",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/api/user/verify/${verificationToken}`,
  };
  console.log("-=-=");
  // Send the email
  try {
    console.log("-=-=");
    await transporter.sendMail(mailOptions);
    console.log("-=-=....");
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const registerUser = async (req, res) => {
  try {
    console.log("success");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please Enter all the Fields" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email Already Registered" });
    }

    const newUser = new User({ name, email, password });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save the user in the db
    await newUser.save();

    // send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("error while registering", error);
    return res.status(500).json({ message: "Registering User failed" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
};

// ==========================================================

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Find the user with the given verification token
    console.log("-login-");

    const user = await User.findOne({ email });
    console.log("-login==", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

module.exports = { registerUser, verifyUser, loginUser };
