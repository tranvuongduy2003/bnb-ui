export interface IProduct {
  id: number;
  name: string;
  desc: string;
  price: number | string;
  status: string;
  brandName: string;
  categoryId: number | string;
  importPrice: number | string;
  inventory: number;
  sold: number;
  images: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}
