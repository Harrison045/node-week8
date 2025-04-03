const AccountModel = require("../model/AccountModel");

const createAccountController = (req, res) => {
  const { name, accountType, accountNumber, phone, address, bankId } = req.body;

  const account = new AccountModel({
    name,
    accountType,
    accountNumber,
    phone,
    address,
    bankId,
  });

  account
    .save()
    .then((account) => {
      if (account) {
        res.json({ message: "Account created successfully", account });
      } else {
        res.json("Failed to create account");
      }
    })
    .catch((err) => console.log(err));
};

const retrieveAccountDetails = (req, res) => {
  AccountModel.find()
  .populate("bankId","name phone -_id")
    .then((account) => {
      if (account) {
        res.json(account);
      } else {
        res.json("Accounts not found");
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { createAccountController,retrieveAccountDetails };
