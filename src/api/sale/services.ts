import axiosInstance, { APIResponse } from "../config"
import { AddSaleType, GetAllSaleType } from "./types"

const baseUrl = "/Sale"
const createSale = async (sale: AddSaleType): Promise<APIResponse<AddSaleType>> => {
    const response = await axiosInstance.post<APIResponse<AddSaleType>>(`${baseUrl}/AddSale`, sale)

    return response.data
}

const getAllSale = async (): Promise<APIResponse<GetAllSaleType[]>> => {
    const response = await axiosInstance.get<APIResponse<GetAllSaleType[]>>(`${baseUrl}/GetAllProduct`)

    return response.data
}

export default {createSale, getAllSale}