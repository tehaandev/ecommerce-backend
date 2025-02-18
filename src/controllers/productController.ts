import { Request, Response } from "express";
import Product from "../models/Product";
import { connectDB } from "../lib/db";
import ProductImage from "../models/ProductImage";
import deleteFile from "../utils/deleteFile";

export const createProduct = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, description, sku, qty, price } = req.body;
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: "Images are required" });
    }
    const product = new Product({
      name,
      sku,
      description,
      qty,
      price,
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
    const products = await Product.find().populate("images", "imageUri");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { id } = req.params;
    const product = await Product.findById(id).populate("images", "imageUri");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { id } = req.params;
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
    const { id } = req.params;
    const { name, price, qty, description, existingImages, thumbnail } =
      req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const parsedExistingImages = existingImages
      ? JSON.parse(existingImages)
      : [];
    const currentImageIds = product.images.map((img: any) =>
      img._id.toString()
    );
    const imagesToDelete = currentImageIds.filter(
      (imgId: any) =>
        !parsedExistingImages.some((img: any) => img._id.toString() === imgId)
    );
    for (let i = 0; i < imagesToDelete.length; i++) {
      const deletedImage = await ProductImage.findByIdAndDelete(
        imagesToDelete[i]
      );
      deleteFile(deletedImage.imageUri);
    }
    if (req.files && Array.isArray(req.files)) {
      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const productImage = await ProductImage.create({
            productId: product._id,
            imageUri: file.path,
          });
          return productImage._id;
        })
      );
      parsedExistingImages.push(...newImages);
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        qty,
        description,
        thumbnail,
        images: parsedExistingImages,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

