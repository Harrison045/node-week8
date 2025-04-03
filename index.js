const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const bankRoutes = require("./routes/BankRoute")
const accountRoute = require("./routes/AccountRoute")

//defining express

const server = express();

//middlewares
server.use(bodyParser.json());

//routes
server.use(bankRoutes)
server.use(accountRoute)

//mongoose connection
mongoose
  .connect(
    "mongodb+srv://odameharrison13:h7GmmZ3tBOPZpRtJ@gen29project.2v2zs.mongodb.net/?retryWrites=true&w=majority&appName=Gen29project"
  )
  .then((result) => {
    //server going live

    server.listen(
      3001,
      "localhost",
      console.log("Server is live on port 3001")
    );
  })
  .catch((error) => console.log(error));
