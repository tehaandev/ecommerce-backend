import { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  id: string | Schema.Types.ObjectId;
  sku: string;
  name: string;
  description: string;
  images: string[] | Schema.Types.ObjectId[];
  thumbnail: string | Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  favorites: string[];
}

export interface ProductImagesDocument extends Document {
  id: string | Schema.Types.ObjectId;
  productId: string | Schema.Types.ObjectId;
  endocedImage: string;
}

