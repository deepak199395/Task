const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: ["name is required"],
    },
    lastname: {
      type: "string",
      required: ["lastname is required"],
      unique: true,
    },
    email: {
      type: "string",
      required: ["email is required"],
    },
    password: {
      type: "string",
      required: ["password is required"],
    },
    phone: {
      type: "string",
      required: ["phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// middleware for hashing password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
// compair password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
