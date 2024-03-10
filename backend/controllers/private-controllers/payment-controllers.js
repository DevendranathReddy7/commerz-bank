const accountsSchema = require("../../models/accounts-schema");
const AccountsSchema = require("../../models/accounts-schema");
const bpaySchema = require("../../models/bpay-schema");
const ftxSchema = require("../../models/ftx-schema");
const panSchema = require("../../models/pan-schema");

const postFundsTrasferPayment = async (req, res, next) => {
  const { fromAccount, toAccount, amount, message, owner, type } = req.body;
  const isFromAccountAvailable = await AccountsSchema.findOne({
    accountNumber: fromAccount,
  });
  const isToAccountAvailable = await AccountsSchema.findOne({
    accountNumber: toAccount,
  });
  const isUserAvailable = await AccountsSchema.findOne({ owner: owner });

  let isValidTxn =
    isFromAccountAvailable?.owner?.toString() ===
      isToAccountAvailable?.owner?.toString() &&
    isUserAvailable?.owner?.toString() ===
      isFromAccountAvailable?.owner?.toString();

  let fundsTransfer;
  if (isValidTxn) {
    try {
      fundsTransfer = new ftxSchema({
        fromAccount,
        toAccount,
        amount,
        message,
        owner,
        type,
      });

      const frmAccBalUpdate = await accountsSchema.updateOne(
        { accountNumber: fromAccount },
        {
          $set: {
            balance: Number(isFromAccountAvailable.balance) - Number(amount),
          },
        }
      );

      const toAccBalUpdate = await accountsSchema.updateOne(
        { accountNumber: toAccount },
        {
          $set: {
            balance: Number(isToAccountAvailable.balance) + Number(amount),
          },
        }
      );

      fundsTransfer.status = "success";
      await fundsTransfer.save();
      res.status(201).json(fundsTransfer);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
      fundsTransfer.status = "failed";
      await fundsTransfer.save();
    }
  } else {
    res.status(400).json({ message: "Provide details are not matched" });
  }
};

const postBillPayment = async (req, res, next) => {
  const { fromAccount, biller, amount, message, owner, type } = req.body;
  const { billerName, billerCode } = biller;
  const isFromAccountAvailable = await AccountsSchema.findOne({
    accountNumber: fromAccount,
  });

  const isUserAvailable = await AccountsSchema.findOne({ owner: owner });

  let isValidTxn =
    isFromAccountAvailable?.owner?.toString() ===
    isUserAvailable?.owner?.toString();

  if (isValidTxn) {
    try {
      let billPayment = new bpaySchema({
        fromAccount,
        biller: {
          billerName,
          billerCode,
        },
        amount,
        message,
        owner,
        type,
      });
      const frmAccBalUpdate = await accountsSchema.updateOne(
        { accountNumber: fromAccount },
        {
          $set: {
            balance: Number(isFromAccountAvailable.balance) - Number(amount),
          },
        }
      );
      billPayment.status = "success";
      await billPayment.save();
      res.status(201).json(billPayment);
    } catch (err) {
      billPayment.status = "failed";
      await billPayment.save();

      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Provide details are not matched" });
  }
};

const postPayAnyonePayment = async (req, res, next) => {
  const { fromAccount, transferType, amount, message, owner, type } = req.body;

  const isFromAccountAvailable = await AccountsSchema.findOne({
    accountNumber: fromAccount,
  });

  const isUserAvailable = await AccountsSchema.findOne({ owner: owner });

  let isValidTxn =
    isFromAccountAvailable?.owner?.toString() ===
    isUserAvailable?.owner?.toString();

  if (isValidTxn) {
    let panDocument;
    try {
      // Conditionally create the document based on transferMode
      if (transferType === "toAccount") {
        const { toAccount } = req.body;
        panDocument = new panSchema({
          fromAccount,
          transferType,
          toAccount,
          amount,
          message,
          owner,
          type,
        });
      } else if (transferType === "email") {
        const { email } = req.body;
        panDocument = new panSchema({
          fromAccount,
          transferType,
          email,
          amount,
          message,
          owner,
          type,
        });
      } else if (transferType === "mobileNumber") {
        const { mobileNumber } = req.body;
        panDocument = new panSchema({
          fromAccount,
          transferType,
          mobileNumber,
          amount,
          message,
          owner,
          type,
        });
      } else {
        return res.status(400).json({ error: "Invalid transferMode" });
      }
      const frmAccBalUpdate = await accountsSchema.updateOne(
        { accountNumber: fromAccount },
        {
          $set: {
            balance: Number(isFromAccountAvailable.balance) - Number(amount),
          },
        }
      );
      panDocument.status = "success";
      await panDocument.save();
      res.status(201).json(panDocument);
    } catch (err) {
      panDocument.status = "failed";
      await panDocument.save();

      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "Provide details are not matched" });
  }
};

const getHistory = async (req, res, next) => {
  const userId = req.params.uid;
  const queryparam = req.query.transfertype;
  let payments = "";
  let ftxPayments = "";
  let bpayPayments = "";
  let panPayments = "";
  try {
    if (queryparam.includes("ft")) {
      ftxPayments = await ftxSchema.find({ owner: userId });
    }
    if (queryparam.includes("bpay")) {
      bpayPayments = await bpaySchema.find({ owner: userId });
    }
    if (queryparam.includes("pan")) {
      panPayments = await panSchema.find({ owner: userId });
    }

    payments = [...ftxPayments, ...bpayPayments, ...panPayments];
  } catch (err) {
    console.log(err);
  }
  res.json({
    payments: payments.map((pmnt) => pmnt.toObject({ getters: true })),
  });
};

exports.postFundsTrasferPayment = postFundsTrasferPayment;
exports.postBillPayment = postBillPayment;
exports.postPayAnyonePayment = postPayAnyonePayment;
exports.getHistory = getHistory;
