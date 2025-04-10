const { validationResult } = require("express-validator");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
  //validation result
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    res.json({ message: error.array()[0].msg });
  }
  //get the data from the req body
  const { name, email, password } = req.body;

  //password hashing
  bcrypt.hash(password, 10).then((hashedpassword) => {
    //pass the data to the database
    const user = new UserModel({ name, email, password: hashedpassword });

    //save data
    user
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => console.log(error));
  });
};

const signInUser = async (req, res) => {
  //validation result
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    res.json({ message: error.array()[0].msg });
  }

  const { email, password } = req.body;
  //locate the email
  await UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if(result){
                return res.json("User in")
            }else{
                return res.json("user not in")
            }
          })
          .catch((error) => console.log(error));
          return
      }
      return res.json("User not found")
    })
    .catch((error) => console.log(error));
};

// const signInUser = async (req,res) => {
//  try {
//     const { email, password } = req.body;
//     //locate the user by email
//     const user = await UserModel.findOne({ email })
//     console.log(user)
//     if(!user){
//         return res.status(400).json({message: 'Email is incorrect'})
        
//     }
//     // compare password 
//     const isPasswordSame = bcrypt.compare(password, user.password)
//     if(!isPasswordSame){
//         return res.status(400).json({message: 'password is incorrect'})
//     }

//     // success case
//     return res.status(200).json({message: 'User signed in successfully'})
//  } catch (error) {
//     res.status(500).json({message: 'Error signing in', error: error.message})
//  }
// }

module.exports = { createUser, signInUser };
