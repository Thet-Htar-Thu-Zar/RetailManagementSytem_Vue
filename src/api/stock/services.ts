import axiosInstance, {type APIResponse } from "../config";
import { GetAllProductType } from "./types";
const baseUrL = "/Product"

const getAllProduct = async (): Promise<APIResponse<GetAllProductType[]>> => {
    const response = await axiosInstance.get<APIResponse<GetAllProductType[]>>(`${baseUrL}/GetAllProduct`)

    return response.data
}



export default{getAllProduct}