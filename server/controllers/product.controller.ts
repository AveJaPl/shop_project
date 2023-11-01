import express, { Request, Response } from "express";

const addProduct = (req: Request, res: Response) => {
  res.send("Add Product");
};

const deleteProduct = (req: Request, res: Response) => {
  res.send("Delete Product");
};

const updateProduct = (req: Request, res: Response) => {
  res.send("Update Product");
};

const getProducts = (req: Request, res: Response) => {
  res.send("Get Products");
};

const getProductById = (req: Request, res: Response) => {
  res.send("Get Product");
};

export { addProduct, deleteProduct, updateProduct, getProducts, getProductById };