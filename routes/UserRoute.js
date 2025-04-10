const express = require("express");
const { createUser, signInUser } = require("../controllers/UserConntroller");
const { body } = require("express-validator");
const UserModel = require("../model/UserModel");

const router = express.Router();

router.post(
  "/user",
  [
    body("name").trim().notEmpty().withMessage("Name required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter email")
      .notEmpty()
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((oneEmail) => {
          if (oneEmail) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    body("password")
      .isLength({ min: 5, max: 40 })
      .withMessage("Password reqiured"),
  ],
  createUser
);

router.post("/sign-in", signInUser);

module.exports = router;
