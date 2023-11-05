import { Request, Response } from "express";
import { Category, PrismaClient } from "@prisma/client";
import {
  IModifiedProduct,
  IAddedProduct,
  ResponseProduct,
} from "../types/Product";
const prisma = new PrismaClient();

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, quantity }: IAddedProduct =
      req.body;

    const dbCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });
    let acceptedCategory;
    if (!dbCategory) {
      const newCategory = (await prisma.category.create({
        data: {
          name: category,
        },
      })) as Category;

      acceptedCategory = newCategory.id;
    } else {
      acceptedCategory = dbCategory.id;
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        price: parseFloat(price.toString()),
        description: description,
        categoryId: acceptedCategory,
        countInStock: parseInt(quantity.toString()),
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
    res.json(product as ResponseProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      additionalQuantity,
    }: IModifiedProduct = req.body;

    const dbCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });
    let acceptedCategory;
    if (!dbCategory) {
      const newCategory = await prisma.category.create({
        data: {
          name: category,
        },
      });

      acceptedCategory = newCategory.id;
    } else {
      acceptedCategory = dbCategory.id;
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        price: parseFloat(price.toString()),
        categoryId: acceptedCategory,
        countInStock: {
          increment: parseInt(additionalQuantity.toString()),
        },
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products as ResponseProduct[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    res.json(product as ResponseProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const catId = parseInt(req.params.categoryId);
    const category = await prisma.category.findUnique({
      where: {
        id: catId,
      },
    });

    res.json(category as Category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories as Category[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getNewArrivalProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    res.json(products as ResponseProduct[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBestSellerProducts = async (req: Request, res: Response) => {
  try {
    const bestSellers = await prisma.productOrder.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 6,
    });

    const bestSellingProducts = await prisma.product.findMany({
      where: {
        id: {
          in: bestSellers.map((product) => product.productId),
        },
      },
      

    });

    const productsMap = new Map<number, number>(bestSellers.map((product) => [product.productId, product._sum?.quantity as number]));

    const sortedData = bestSellingProducts.sort((a, b) => {
      return (productsMap.get(b.id) as number || 0) - (productsMap.get(a.id) as number || 0);
    });

    res.json(sortedData as ResponseProduct[]);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


const getRecommendedProducts = async (req: Request, res: Response) => {
  try {
    res.send("getRecommendedProducts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById,
  getCategories,
  getCategoryById,
  getNewArrivalProducts,
  getBestSellerProducts,
  getRecommendedProducts
};
