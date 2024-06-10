import * as z from "zod";



export const dashboardProductsSchema = z.object({
  title: z.string().min(1, "Title is required."),
  brand: z.string().min(1, "Brand is required."),
  category: z.string().min(1, "Category is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().min(1, "Price is required."),
  stock: z.number().min(1, "Stock is required."),
  discountPercentage: z.number().min(1, "DiscountPercentage is required."),
});

export type TdashboardProductsSchema = z.infer<typeof dashboardProductsSchema>;
