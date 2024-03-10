const billerSchema = require("../../models/biller-schema");
const payeesSchema = require("../../models/payees-schema");

const createBillers = async (req, res, next) => {
  const { billerName, billerCode, billerRef, owner } = req.body;
  try {
    const biller = new billerSchema({
      billerName,
      billerCode,
      billerRef,
      owner,
    });

    await biller.save();
    res.status(201).json(biller);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getBillers = async (req, res, next) => {
  const userId = req.params.uid;
  let billers = "";
  try {
    billers = await billerSchema.find({ owner: userId });
  } catch (err) {}
  res.json({
    billers: billers.map((acc) => acc.toObject({ getters: true })),
  });
};

const deleteBillers = async (req, res, next) => {
  const billerId = req.params.bid;
  let billers = "";
  try {
    billers = await billerSchema.findByIdAndDelete(billerId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  res.json({
    // Check if billers is truthy before mapping (toObject method)
    billers: billers ? billers.toObject({ getters: true }) : null,
  });
};

const editBillers = async (req, res, next) => {
  const { billerName, billerCode, billerRef, owner, billerId } = req.body;

  const isBillerExisting = billerSchema.find({ _id: billerId });
  const isUserExisting = billerSchema.find({ owner: owner });
  if (isUserExisting) {
    try {
      await billerSchema.findOneAndUpdate(
        { _id: billerId },
        {
          $set: {
            billerName: billerName,
            billerCode: billerCode,
            billerRef: billerRef,
          },
        }, // Update to be applied
        { new: true },
        res.status(201).json({ message: "biller updated successfully" })
      );
    } catch (err) {}
  }
};

const createPayees = async (req, res, next) => {
  const { payeeName, transferType, paymentValue, owner, ifscCode } = req.body;
  const isUserExisting = payeesSchema.find({ owner: owner });
  if (isUserExisting) {
    let payee;
    try {
      if (transferType === "Account Number") {
        payee = new payeesSchema({
          payeeName,
          transferType: "toAccount",
          toAccount: paymentValue,
          ifscCode,
          owner,
        });
      } else if (transferType === "Email") {
        payee = new payeesSchema({
          payeeName,
          transferType: "email",
          email: paymentValue,
          owner,
        });
      } else if (transferType === "Mobile Number") {
        payee = new payeesSchema({
          payeeName,
          transferType: "mobileNumber",
          paymentValue,
          mobileNumber: paymentValue,
          owner,
        });
      }
      await payee.save();
      res.status(201).json(payee);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};

const editPayees = async (req, res, next) => {
  const { ifscCode, owner, payeeName, paymentValue, transferType, payeeId } =
    req.body;
  const isPayeeExisting = payeesSchema.find({ _id: payeeId });
  const isUserExisting = payeesSchema.find({ owner: owner });
  if (isUserExisting) {
    try {
      await payeesSchema.findOneAndUpdate(
        { _id: payeeId },
        {
          $set: {
            ifscCode,
            payeeName,
            paymentValue,
            transferType,
          },
        },
        { new: true },
        res.status(201).json({ message: "biller updated successfully" })
      );
    } catch (err) {
      console.log(err);
    }
  }
};

const deletePayees = async (req, res, next) => {
  const payeeId = req.params.bid;
  let payee = "";
  try {
    payee = await payeesSchema.findByIdAndDelete(payeeId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  res.json({
    // Check if billers is truthy before mapping (toObject method)
    payee: payee ? payee.toObject({ getters: true }) : null,
  });
};

const getPayees = async (req, res, next) => {
  const userId = req.params.uid;
  let payees = "";
  try {
    payees = await payeesSchema.find({ owner: userId });
  } catch (err) {}
  res.json({
    payees: payees.map((acc) => acc.toObject({ getters: true })),
  });
};

exports.createBillers = createBillers;
exports.editBillers = editBillers;
exports.deleteBillers = deleteBillers;
exports.getBillers = getBillers;

exports.createPayees = createPayees;
exports.editPayees = editPayees;
exports.deletePayees = deletePayees;
exports.getPayees = getPayees;
