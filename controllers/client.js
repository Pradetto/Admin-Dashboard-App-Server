import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

//Probably should use an aggregate function similar to Joins in SQL to optimize this query it's kind fo slow
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
