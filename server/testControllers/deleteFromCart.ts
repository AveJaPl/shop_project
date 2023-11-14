import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteFromCart = async(userId:number, productId:number) => {
  
    const cart = await prisma.carts.findUnique({
      where: {
        userId,
      },
      include: {
        cartDetails: true,
      },
    });
  
    if (!cart) throw new Error("Cart not found");
  
    const existingProduct = cart.cartDetails.find(
      (cartDetail) => cartDetail.productId === productId
    );
  
    if (!existingProduct)
      throw new Error("Product not found");
  
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
  
    return("Product deleted from cart");
  
  }

export { deleteFromCart };
