import axiosInstance, { type APIResponse } from "../config";
import {
  DeleteProductType,
  GetAllProductType,
  UpdateProductInputType,
} from "./types";
const baseUrL = "/Product";

const getAllProduct = async (): Promise<APIResponse<GetAllProductType[]>> => {
  const response = await axiosInstance.get<APIResponse<GetAllProductType[]>>(
    `${baseUrL}/GetAllProduct`
  );

  return response.data;
};

const addProduct = async (
  data: any
): Promise<APIResponse<GetAllProductType>> => {
  const response = await axiosInstance.post<APIResponse<GetAllProductType>>(
    `${baseUrL}/AddProduct`,
    data
  );

  return response.data;
};

const updateProduct = async (
  data: any
): Promise<APIResponse<UpdateProductInputType>> => {
  const response = await axiosInstance.put<APIResponse<UpdateProductInputType>>(
    `${baseUrL}/UpdateProduct`,
    data
  );

  return response.data;
};

const deleteProduct = async (
  id: string
): Promise<APIResponse<DeleteProductType>> => {
  const response = await axiosInstance.delete<APIResponse<DeleteProductType>>(
    `${baseUrL}/DeleteProduct?id=${id}`
  );
  return response.data;
};

export default { getAllProduct, addProduct, updateProduct, deleteProduct };
