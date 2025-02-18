import mongoose, { Schema } from "mongoose";
import { ProductImageDocument } from "../interfaces/document";

const ProductImageSchema = new Schema<ProductImageDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    imageUri: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductImage =
  mongoose.models.ProductImage ||
  mongoose.model("ProductImage", ProductImageSchema);
export default ProductImage;

