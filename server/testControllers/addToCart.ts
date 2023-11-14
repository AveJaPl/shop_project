import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const addToCart = async (userId: number, productId: number) => {
  if (!userId) throw new Error("Unauthorized");

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

  return "Product added to cart";
};

export default addToCart;
