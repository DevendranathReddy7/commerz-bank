// import { uuid } from "uuid";

const HttpError = require("../models/http-error");
const UserSchema = require("../models/user-schema");

const login = async (req, res, next) => {
  const { number, password } = req.body;
  let existingUser = "";

  try {
    existingUser = await UserSchema.findOne({ number: number });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Seems you don't have account with Commerz..Please open account by clicking below link",
      401
    );
    return next(error);
  }
  if (existingUser.password !== password) {
    const error = new HttpError(
      "You've entered invalid credentials..please enter valid credentials",
      401
    );
    return next(error);
  }
  //this will send back logged in user if success or error message
  res.status(200).json({ user: existingUser.toObject({ getters: true }) });
};

const signin = async (req, res, next) => {
  const { name, number, password } = req.body;
  let existingUser = "";

  try {
    existingUser = await UserSchema.findOne({ number: number });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Mobile Number already taken..please user different Mobile Number or try login instead.",
      400
    );
    return next(error);
  }
  const newUser = new UserSchema({
    name,
    number,
    password,
  });

  await newUser.save();
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.login = login;
exports.signin = signin;
