import { BaseQueryApi } from "@reduxjs/toolkit/query"

export enum ProductCategory {
  Writing = 'Writing',
  OfficeSupplies = 'Office Supplies',
  ArtSupplies = 'Art Supplies',
  Educational = 'Educational',
  Technology = 'Technology',
}

export interface TOrderProduct {
  _id: string
  name: string
  brand: string
  price: number
  imageUrl: string
  category: ProductCategory
  description: string
  quantity: number
  inStock: boolean
}

export type TError = {
  data: {
    message: string
    stack: string
    success: boolean
  }
  status: number
}

export type TResponse<T> = {
  data?: T
  error?: TError
  success: boolean
  message: string
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi

export type TQueryParam = {
  name: string
  // value: boolean | React.Key
  value: string | number | boolean | React.Key
}

export type TUserInfo = {
  name: string
  email: string
  role: string
}

export interface CartItem extends TOrderProduct {
  quantity: number
}