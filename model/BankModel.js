const { default: mongoose } = require("mongoose");

//Schema
const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accounts: [
    {
      accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },
    },
  ],
});

//model
const BankModel = mongoose.model("Bank", BankSchema);

//export model
module.exports = BankModel;
