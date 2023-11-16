import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCart = async (userId: number) => {
    try {
      // Pobieranie szczegółów koszyka
      const cart = (await prisma.carts.findUnique({
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
      })) || await prisma.carts.create({
        data: {
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
  
      return{
        cartDetails,
        totalValue,
      }
  
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong" );
    }
  };


  export {
    getCart,
}