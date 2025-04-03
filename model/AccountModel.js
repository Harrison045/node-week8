const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bankId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:"Bank"
  },
});

const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel;
