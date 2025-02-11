const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim alanı zorunludur"],
    },
    email: {
      type: String,
      required: [true, "Email alanı zorunludur"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Şifre alanı zorunludur"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Şifreyi hashleme
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Şifre kontrolü
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
