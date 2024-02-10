const generateUniqueAccount = require("generate-unique-id");
const AccountsSchema = require("../../models/accounts-schema");
const userSchema = require("../../models/user-schema");
const accountsSchema = require("../../models/accounts-schema");

//create an account
const openAnAccount = async (req, res, next) => {
  const { accountName, balance, owner } = req.body;
  let accountNumber = generateUniqueAccount({
    length: accountName === "Credit Card" ? 16 : 10,
    useLetters: false,
  });

  try {
    // Create a new instance of Accounts
    const newAccount = new AccountsSchema({
      accountName,
      accountNumber,
      balance,
      owner,
    });

    // Save the new account to the database
    await newAccount.save();

    // Update the User document with the new account's ObjectId
    await userSchema.findByIdAndUpdate(owner, {
      $push: { accounts: newAccount._id },
    });
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get accounts for userId
const getAccountByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let accounts = "";
  try {
    accounts = await accountsSchema.find({ owner: userId });
  } catch (err) {
    console.log(err);
  }
  res.json({
    accounts: accounts.map((acc) => acc.toObject({ getters: true })),
  });
};
exports.openAnAccount = openAnAccount;
exports.getAccountByUserId = getAccountByUserId;
