import mongoose, { Schema } from "mongoose";
import { ProductDocument } from "../interfaces/document";

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: [true, "Product name is required"] },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: [true, "SKU already exists"],
    },
    price: {
      type: String,
      required: [true, "Product price is required"],
    },
    qty: {
      type: String,
      required: [true, "Product quantity is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    images: [{ type: Schema.Types.ObjectId, ref: "ProductImage" }],
    thumbnail: { type: Schema.Types.ObjectId, ref: "ProductImage" },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;

