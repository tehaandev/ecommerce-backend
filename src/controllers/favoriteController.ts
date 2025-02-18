import { Request, Response } from "express";
import User from "../models/User";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.payload.userId;
    const { productID } = req.body;
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favorites: productID },
      },
      { new: true }
    );
    res.status(201).json({ message: "Favorite added" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.payload.userId;
    const { productID } = req.body;
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: productID },
      },
      { new: true }
    );
    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.payload.userId;
    const user = await User.findById(userId).populate(
      "favorites",
      "name thumbnail sku"
    );
    res.status(200).json(user?.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

