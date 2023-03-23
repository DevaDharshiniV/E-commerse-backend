export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  productImgPath: string;
  category: {
    categoryId: string;
    category: string;
  };
  isFeatured: boolean,
}
