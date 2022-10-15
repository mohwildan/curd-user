import ProductModel from "../models/ProductModel.js";

export const getProduct = async (_req, res) => {
  const user = await ProductModel.find();
  res.status(200).json(user);
};

export const createProduct = async (req, res) => {
  const { title, description, image, name, email } = req.body;
  try {
    const user = await ProductModel.create({
      title,
      description,
      image,
      name,
      email,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const findByIdProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await ProductModel.findOne({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, image, name, email } = req.body;
  const { id } = req.params;
  try {
    const user = await ProductModel.findOneAndUpdate(
      { id },
      { name, email, title: title || "tidak ada judul", description, image }
    );

    res.status(200).json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await ProductModel.deleteOne({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
