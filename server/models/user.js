const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/constants");

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "anonymous"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: config.DB.USER_COLLECTION,
  }
);

userSchema.pre("validate", function (next) {
  if (this.isNew) {
    if (!this.email && !this.password) {
      this.role = "anonymous";
    } else {
      if (!this.email) {
        this.invalidate(
          "email",
          "Email is required if password or email is provided"
        );
      }
      if (!this.password) {
        this.invalidate(
          "password",
          "Password is required if password or email is provided"
        );
      }
      this.role = "user";
    }
  }
  next();
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
