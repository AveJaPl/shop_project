import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Pobieranie szczegółów koszyka
    const cart = await prisma.carts.findUnique({
      where: {
        userId,
      },
      include: {
        cartDetails: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    // Sprawdzenie, czy koszyk istnieje
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Obliczanie całkowitej wartości koszyka
    let totalValue = 0;
    const cartDetails = cart.cartDetails.map((cartDetail) => {
        const itemTotal = cartDetail.product.price * cartDetail.quantity;
        totalValue += itemTotal;
        return {
            id: cartDetail.productId,
            name: cartDetail.product.name,
            price: cartDetail.product.price,
            quantity: cartDetail.quantity,
            total: itemTotal,
        }
    }
    );

    const cartResponse = {
        cartDetails,
        totalValue,
    }

    res.json(cartResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addToCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const productId = req.body.productId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const cart = await prisma.carts.findUnique({
    where: {
      userId,
    },
    include: {
      cartDetails: true,
    },
  });

  // Jeśli koszyk nie istnieje, utwórz nowy, a jeśli istnieje, dodaj do niego produkt
  if (!cart) {
    await prisma.carts.create({
      data: {
        userId,
        cartDetails: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  } else {
    const existingProduct = cart.cartDetails.find(
      (cartDetail) => cartDetail.productId === productId
    );

    // Jeśli produkt już istnieje w koszyku, zwiększ jego ilość o 1
    if (existingProduct) {
      await prisma.cartDetails.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          quantity: existingProduct.quantity + 1,
        },
      });
    } else {
      await prisma.cartDetails.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }
  }  


  res.json({ message: "Product added to cart" });
};

const deleteFromCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const productId = parseInt(req.params.id);

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const cart = await prisma.carts.findUnique({
    where: {
      userId,
    },
    include: {
      cartDetails: true,
    },
  });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const existingProduct = cart.cartDetails.find(
    (cartDetail) => cartDetail.productId === productId
  );

  if (!existingProduct)
    return res.status(404).json({ message: "Product not found" });

  if (existingProduct.quantity === 1) {
    await prisma.cartDetails.delete({
      where: {
        id: existingProduct.id,
      },
    });
  }

  if (existingProduct.quantity > 1) {
    await prisma.cartDetails.update({
      where: {
        id: existingProduct.id,
      },
      data: {
        quantity: existingProduct.quantity - 1,
      },
    });
  }

  res.send("Product deleted from cart");

}

export { getCart, addToCart, deleteFromCart };
