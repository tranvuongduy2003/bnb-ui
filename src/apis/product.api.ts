import httpRequest from "@/services/httpRequest";

export const getAllProducts = () => {
  return httpRequest.get("/products");
};

export const createNewProduct = (data: any) => {
  return httpRequest.post("/products", data);
};

export const getProductById = (productId: string) => {
  return httpRequest.get(`/products/${productId}`);
};

export const updateProductById = (productId: string | number, data: any) => {
  return httpRequest.put(`/products/${productId}`, data);
};

export const deleteProductById = (productId: string | number) => {
  return httpRequest.delete(`/products/${productId}`);
};
