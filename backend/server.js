const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.post("/submitform", (req, res) =>{

  console.log(req.body);
  res.send("ORDER RECEIVED");

  const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const emailOptions = {
    from: process.env.EMAIL_FROM,
    to: "test123@test.com",
    subject: "NEW ORDER ALERT",
    html: `
      <div className = "body" style = "
        background-color: #fef7e9;
        height: 100vh;
        ">
        <div style = "
          font-family: 'Montserrat', sans-serif;
          color: #c32a41 !important;
          background-color: #fef7e9;
          text-align: center;
          padding-top: 20px;
          ">
          <h1>POCKETBELLY</h1>
          <h1>You received an order!</h1>
          <h2>Please call or email customer to confirm their order!</h2>
          <h3>Order Details</h3>
          <h4>${req.body.handling}</h4>
          <h4>${req.body.name}</h4>
          <h4>${req.body.email}</h4>
          <h4>${req.body.phone}</h4>
          <h4>${req.body.address}</h4>
          <h4>${req.body.lechon}</h4>
          <h4>${req.body.siomai}</h4>
        </div>
      </div>
    `
  }

  transporter.sendMail(emailOptions, function(err, info){

    if(err){

      console.log(err);
    }
    else{
      console.log("sent " + info.response);
    }
  });

});

app.listen(4000);
