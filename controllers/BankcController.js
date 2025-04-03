const AccountModel = require("../model/AccountModel");
const BankModel = require("../model/bankModel");
const { validationResult } = require("express-validator");

const createBankDetails = (req, res) => {
  //validation check
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return res.json({ message: error.array()[0].msg });
  }

  //get the data from the request body
  const { name, location, address, phone, accountNumber } = req.body;
  //codes to create and push data to the model
  const bank = new BankModel({ name, location, address, phone, accountNumber });
  //save data in model and give a response
  bank
    .save()
    .then((result) => {
      res.json({ message: "bank created successfully", data: result });
    })
    .catch((err) => console.log(err));
};

const retrieveBankDetails = (req, res) => {
  let { id } = req.params;
  if (id) {
    BankModel.findById(id)
      .then((result) => {
        res.json({ message: "Bank details found", data: result });
      })
      .catch((error) => console.log(error));
  } else {
    BankModel.find()
      .then((result) => {
        res.json({ message: "Bank details found", data: result });
      })
      .catch((error) => console.log(error));
  }
};

const updateBankDetails = (req, res) => {
  //get data from the request body to be updated
  const { id, name, location, address, phone, accountNumber } = req.body;
  try {
    BankModel.findById(id).then((bank) => {
      if (bank) {
        bank.name = name;
        bank.location = location;
        bank.address = address;
        bank.phone = phone;
        bank.accountNumber = accountNumber;

        bank.save();
        res.json(bank);
      } else {
        res.json("Bank not found");
      }
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteBankDetails = async (req, res) => {
  try {
    const deletebankId = await BankModel.findByIdAndDelete(req.params.id);

    if (deletebankId) {
      AccountModel.deleteMany({ bankId: deletebankId._id })
        .then((deleteBank) => {
          res.status(201).json({ message: "Bank removed", deletebankId });
        })
        .catch((err) => console.log(Error));
    } else {
      res.status(500).json("Bank not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
};
