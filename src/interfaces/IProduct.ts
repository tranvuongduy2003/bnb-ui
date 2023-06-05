export interface IProduct {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: string;
  brandName: string;
  categories_id: string;
  quantity: number;
  sold: number;
  images: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}
