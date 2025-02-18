import { Request, Response } from "express";
import Product from "../models/Product";
import { connectDB } from "../lib/db";
import ProductImage from "../models/ProductImage";
import deleteFile from "../utils/deleteFile";

export const createProduct = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, description, sku } = req.body;
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: "Images are required" });
    }
    const product = new Product({
      name,
      sku,
      description,
    });
    const images = await Promise.all(
      req.files.map(async (file) => {
        const productImage = await ProductImage.create({
          productId: product._id,
          imageUri: file.path,
        });
        return productImage._id;
      })
    );
    product.images = images;
    product.thumbnail = images[0];
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const images = await ProductImage.find({ productId: id });
    for (let i = 0; i < images.length; i++) {
      await ProductImage.findByIdAndDelete(images[i]._id);
      deleteFile(images[i].imageUri);
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

