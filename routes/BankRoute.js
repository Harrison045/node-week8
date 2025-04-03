const express = require("express");
const {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
} = require("../controllers/BankcController");
const { body } = require("express-validator");
const BankModel = require("../model/bankModel");

const router = express.Router();

router.post(
  "/bank",
  [
    body("name").notEmpty().trim().withMessage("name field empty"),
    body("phone")
      .isMobilePhone("en-GH")
      .withMessage("number invalid")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankPhoneNumber) => {
          if (bankPhoneNumber) {
            return Promise.reject("phone number in use");
          }
        });
      }),
  ],
  createBankDetails
);
router.get("/bank/:id?", retrieveBankDetails);
router.put("/bank/:id", updateBankDetails);
router.delete("/bank/:id", deleteBankDetails);

module.exports = router;
