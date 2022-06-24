const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const nodemailer = require("nodemailer");

const axios = require("axios");

require("dotenv").config();

admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: "Sendinblue",
  auth: {
    user: "fixup.t.manager@gmail.com",
    pass: "GfnSVtC8qJNBbTv7",
  },
});
const app = express();
app.use(cors);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sendEmail = async function (obj) {
  const msg = {
    to: "fixup.orders@gmail.com", // Change to your recipient
    from: "fixup.t.manager@gmail.com", // Change to your verified sender
    subject: `An order from a client ${obj.fullname}`,
    html: `<div>
    <p>Fullname: ${obj.fullname}</p><p>Adresse: ${obj.adresse}</p>
    <p>Description: ${obj.description}</p>
    <p>Phone: ${obj.phone}</p>
    <p>Type of the service: ${obj.type}</p>
    <img alt="hh" src=${obj.photo}/>
    </div>`,
  };

  transporter
    .sendMail(msg)
    .then(() => {
      axios.post(
        `https://fixapp-solcode-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
        {
          fullname: obj.fullname,
          adresse: obj.adresse,
          description: obj.description,
          phone: obj.phone,
          type: obj.type,
        }
      );
    })
    .catch((error) => {
      throw new Error(error);
    });
};

app.post("/sendemail", async (req, res, next) => {
  try {
    console.log(req.body);
    const obj = {
      fullname: req.body.fullname,
      adresse: req.body.addresse,
      phone: req.body.phone,
      description: req.body.description,
      type: req.body.type,
      photo: req.body.photo,
    };
    await sendEmail(obj);
    res.status(200).json({
      message: "Email has been sent successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Email could not been sent, please try again later",
    });
  }
});

exports.sendMail = functions.https.onRequest(app);
