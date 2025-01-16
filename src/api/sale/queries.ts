import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/vue-query'
import addSaleServices from './services'
import getSaleServices from './services'
import type { AddSaleType, GetAllSaleType } from './types'
import type { APIResponse } from '../config'

export const addSale = {
    useMutation: (opt?: UseMutationOptions<any, Error, AddSaleType, any>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addSale'],
            mutationFn: (payload: AddSaleType) => addSaleServices.createSale(payload), 
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['createSale'] })
            },
            ...opt
        })
    }
}

export const fetchSales = {
    useQuery: (opt?: UseQueryOptions<GetAllSaleType[], Error>) =>
        useQuery<GetAllSaleType[], Error>({
            queryKey: ['getallproduct'],
            queryFn: async () => {
                const response: APIResponse<GetAllSaleType[]> = await getSaleServices.getAllSale()

                return response.data
            },
            ...opt
        })
}
