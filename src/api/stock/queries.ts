import productServices from './services'
import { GetAllProductType } from "./types";
import { APIResponse } from "../config";
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

export const fetchStocks = {
    useQuery: (opt?: UseQueryOptions<GetAllProductType[], Error>) =>
        useQuery<GetAllProductType[], Error>({
            queryKey: ['getallproduct'],
            queryFn: async () => {
                const response: APIResponse<GetAllProductType[]> = await productServices.getAllProduct()

                return response.data
            },
            ...opt
        })
}