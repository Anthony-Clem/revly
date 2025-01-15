import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  apiKey: string;
  lastTimeGeneratingKey: Date;
  comparePasswords(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      default: null,
    },
    lastTimeGeneratingKey: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.apiKey;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePasswords = async function (val: string) {
  return bcrypt.compare(val, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
