import { IProductTypes } from "../interfaces";

export const decrementQuantity = (
  CartItems: IProductTypes[],
  Payload: IProductTypes
): IProductTypes[] => {
  const hasCart = CartItems.find((item) => item.id === Payload.id);

  if (hasCart) {
    return CartItems.map((item) =>
      item.id === Payload.id
        ? {
            ...item,
            attributes: {
              ...item.attributes,
              stock: item?.attributes?.stock + 1,
              quantity: (item.attributes.quantity ?? 0) - 1,
            },
          }
        : item
    ).filter((item) => (item?.attributes?.quantity ?? 0) > 0);
  }

  return CartItems;
};
