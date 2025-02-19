import { Request, Response } from "express";
import { connectDB } from "../lib/db";
import Product from "../models/Product";

export const searchProducts = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { query } = req.params;
    const products = await Product.aggregate([
      {
        $search: {
          index: "product",
          compound: {
            should: [
              {
                text: {
                  query,
                  path: "name",
                  fuzzy: { maxEdits: 2 },
                  score: { boost: { value: 5 } },
                },
              },
              {
                text: {
                  query,
                  path: "sku",
                  fuzzy: { maxEdits: 2 },
                  score: { boost: { value: 3 } },
                },
              },
              {
                text: {
                  query,
                  path: "description",
                  score: { boost: { value: 1 } },
                  fuzzy: {
                    maxEdits: 1,
                    prefixLength: 2,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          qty: 1,
          description: 1,
          images: 1,
        },
      },
      {
        $addFields: {
          type: "product",
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    await connectDB();
    // Get the query parameter from the URL
    // Example: /api/search/suggestions?q=apple
    const { query } = req.params;

    const products = await Product.aggregate([
      {
        $search: {
          index: "product",
          compound: {
            should: [
              {
                text: {
                  query,
                  path: "name",
                  fuzzy: { maxEdits: 1 },
                  score: { boost: { value: 3 } },
                },
              },
              {
                text: {
                  query,
                  path: "sku",
                  fuzzy: { maxEdits: 1 },
                  score: { boost: { value: 2 } },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          sku: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

