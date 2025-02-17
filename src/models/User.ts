import mongoose, { Schema } from "mongoose";
import { UserDocument } from "@/interfaces/document";
import hashPassword from "@/utils/hashPassword";

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Hash password before saving if it's modified
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await hashPassword(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

