import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Overview", "Admins"],
    endpoints: (build) => ({
        getUser: build.query({
            query : (id) =>`general/user/${id}`,
            providesTags: ['User']
        }),
        getProduct: build.query({
            query: () => `clients/products`,
            providesTags: ['Products']
        }),
        getCustomer: build.query({
            query: () => `clients/customers`,
            providesTags: ['Customers']
        }),
        getTransaction: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: `clients/transactions`,
                method: "GET",
                params: {
                    page,
                    pageSize,
                    sort,
                    search
                }
            }),
            providesTags: ['Transactions']
        }),
        getGeography: build.query({
            query: () => `clients/geography`,
            providesTags: ['Geography']
        }),
        getOverview: build.query({
            query: () => `sale/overview`,
            providesTags: ['Overview']
        }),
        getAdmins: build.query({
            query: () => `management/admins`,
            providesTags: ['Admins']
        })

    })
})

export const { useGetUserQuery, useGetProductQuery, useGetCustomerQuery, useGetTransactionQuery, useGetGeographyQuery, useGetOverviewQuery, useGetAdminsQuery } = api