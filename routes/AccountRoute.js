const express = require("express")
const { createAccountController, retrieveAccountDetails } = require("../controllers/AccountController")

const router = express.Router()

router.post("/account", createAccountController)
router.get("/account", retrieveAccountDetails)

module.exports = router