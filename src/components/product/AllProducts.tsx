import { useGetAllProductDataQuery } from "@/redux/Features/products/productApi";
import { TQueryParam } from "@/types/global";
import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { allProductCategories } from "@/constants/global";
import { TextShimmer } from "../ui/text-shimmer";
import SingleProduct from "./SingleProduct";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
  quantity: number;
};

const AllProducts: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: response, isLoading } = useGetAllProductDataQuery(params);

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (!value) return;

    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : [];
      const filterParams = updatedParams.filter((param) => param.name !== name);

      if (name === "minPrice" || name === "maxPrice") {
        // Ensure value is a string, not a number, for consistency in query params
        filterParams.push({
          name,
          value: String(value),
        });
      } else if (name === "inStock") {
        // Make sure the value is a string "true" or "false"
        filterParams.push({ name, value: value === "true" ? "true" : "false" });
      } else {
        filterParams.push({ name, value });
      }
      return filterParams;
    });
  };

  const products =
    response?.data || response?.result || response?.data?.result || [];

  return (
    <div>
      <div className="relative">
        <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
        <Input
          placeholder="Search by name or category"
          className="pl-10"
          onChange={handleChangeFilter}
          name="searchTerm"
        />
      </div>

      <div className="flex w-full gap-4 my-4">
        <Select
          onValueChange={(value) => {
            setParams((prevParams) => {
              const updatedParams = prevParams ? [...prevParams] : [];
              const filterParams = updatedParams.filter(
                (param) => param.name !== "category"
              );
              filterParams.push({ name: "category", value });
              return filterParams;
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {allProductCategories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setParams((prevParams) => {
              const updatedParams = prevParams ? [...prevParams] : [];
              const filterParams = updatedParams.filter(
                (param) => param.name !== "inStock"
              );
              filterParams.push({ name: "inStock", value });
              return filterParams;
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">In Stock</SelectItem>
            <SelectItem value="false">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          className="max-w-sm"
          name="minPrice"
          placeholder="Min Price"
          onChange={handleChangeFilter}
        />
        <Input
          type="number"
          className="max-w-sm"
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleChangeFilter}
        />
      </div>

      <div className="my-10 md:my-16">
        {isLoading ? (
          <TextShimmer
            className="my-12 text-3xl text-center font-charm"
            duration={0.7}
          >
            Fetching products...
          </TextShimmer>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product: TProduct) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;


// import { useGetAllProductDataQuery } from '@/redux/Features/products/productApi'
// import { TQueryParam } from '@/types/global'
// import { useCallback, useMemo, useState } from 'react'
// import { Input } from '../ui/input'
// import { Search } from 'lucide-react'
// import { allProductCategories } from '@/constants/global'
// import { TextShimmer } from '../ui/text-shimmer'
// import SingleProduct from './SingleProduct'
// import {
//   Select,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
// } from '../ui/select'
// import { Button } from '../ui/button'
// import debounce from 'lodash.debounce'

// export type TProduct = {
//   _id: string
//   name: string
//   description: string
//   imageUrl: string
//   price: number
//   category: string
//   brand: string
//   inStock: boolean
//   quantity: number
// }

// const AllProducts: React.FC = () => {
//   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
//   const { data: response, isLoading } = useGetAllProductDataQuery(params)

//   const setFilterParam = (name: string, value: string | number) => {
//     setParams((prev) => {
//       const updated = prev ? [...prev] : []
//       const withoutCurrent = updated.filter((param) => param.name !== name)
//       return [...withoutCurrent, { name, value }]
//     })
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) => {
//     const { name, value } = e.target

//     if (value === '') {
//       return setParams((prev) => prev?.filter((param) => param.name !== name))
//     }

//     const numericFields = ['minPrice', 'maxPrice']
//     const paramValue = numericFields.includes(name) ? Number(value) : value
//     setFilterParam(name, paramValue)
//   }

//   const handleSearchChange = useCallback(
//     debounce((value: string) => {
//       if (value === '') {
//         setParams((prev) => prev?.filter((param) => param.name !== 'searchTerm'))
//       } else {
//         setFilterParam('searchTerm', value)
//       }
//     }, 500),
//     []
//   )

//   const products = useMemo(() => {
//     return response?.data || response?.data?.result || []
//   }, [response])

//   const handleClearFilters = () => {
//     setParams(undefined)
//   }

//   return (
//     <div>
//       <div className='relative'>
//         <Search className='absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2' />
//         <Input
//           placeholder='Search by title or category'
//           className='pl-10'
//           onChange={(e) => handleSearchChange(e.target.value)}
//           name='searchTerm'
//         />
//       </div>

//       <div className='flex flex-wrap w-full gap-4 my-4'>
//         <Select
//           onValueChange={(value) => setFilterParam('category', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder='Filter by Category' />
//           </SelectTrigger>
//           <SelectContent>
//             {allProductCategories?.map((category) => (
//               <SelectItem key={category} value={category}>
//                 {category}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select
//           onValueChange={(value) => setFilterParam('inStock', value)}
//         >
//           <SelectTrigger className='w-[180px]'>
//             <SelectValue placeholder='Filter by Availability' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='true'>In Stock</SelectItem>
//             <SelectItem value='false'>Out of Stock</SelectItem>
//           </SelectContent>
//         </Select>

//         <Input
//           type='number'
//           className='max-w-sm'
//           name='minPrice'
//           placeholder='Min Price'
//           onChange={handleInputChange}
//         />
//         <Input
//           type='number'
//           className='max-w-sm'
//           name='maxPrice'
//           placeholder='Max Price'
//           onChange={handleInputChange}
//         />

//         <Button onClick={handleClearFilters} variant='outline'>
//           Clear Filters
//         </Button>
//       </div>

//       <div className='my-10 md:my-16'>
//         {isLoading ? (
//           <TextShimmer
//             className='my-12 text-3xl text-center font-charm'
//             duration={0.7}
//           >
//             Fetching products...
//           </TextShimmer>
//         ) : products?.length > 0 ? (
//           <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
//             {products.map((product: TProduct) => (
//               <SingleProduct key={product._id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <p className='text-4xl text-center text-gray-500'>No products found.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AllProducts

// import { useGetAllProductDataQuery } from '@/redux/Features/products/productApi'
// import { TQueryParam } from '@/types/global'
// import { useState } from 'react'
// import { Input } from '../ui/input'
// import { Search } from 'lucide-react'
// import { allProductCategories } from '@/constants/global'
// import { TextShimmer } from '../ui/text-shimmer'
// import SingleProduct from './SingleProduct'
// import {
//   Select,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
// } from '../ui/select'
// import { Button } from '../ui/button'

// export type TProduct = {
//   _id: string
//   name: string
//   description: string
//   image: string
//   price: number
//   category: string
//   brand: string
//   inStock: boolean
//   quantity: number
// }

// const AllProducts: React.FC = () => {
//   const [params, setParams] = useState<TQueryParam[]>([
//     { name: 'page', value: 1 },
//     { name: 'limit', value: 8 },
//     { name: 'sortBy', value: 'createdAt' },
//     { name: 'sortOrder', value: 'desc' },
//   ])

//   const [searchTerm, setSearchTerm] = useState('')
//   const [category, setCategory] = useState('')
//   const [minPrice, setMinPrice] = useState('')
//   const [maxPrice, setMaxPrice] = useState('')
//   const [inStock, setInStock] = useState('')

//   const { data: response, isLoading } = useGetAllProductDataQuery(params)
//   const products = response?.data?.result || response?.data || []

//   const updateParam = (name: string, value: any) => {
//     setParams((prev) => {
//       const updated = prev.filter((param) => param.name !== name)
//       return [...updated, { name, value }]
//     })
//   }

//   const handleChangeFilter = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target
//     if (value === '') return

//     switch (name) {
//       case 'search':
//         setSearchTerm(value)
//         updateParam('search', value)
//         break
//       case 'category':
//         setCategory(value)
//         updateParam('category', value)
//         break
//       case 'minPrice':
//         setMinPrice(value)
//         updateParam('minPrice', value)
//         break
//       case 'maxPrice':
//         setMaxPrice(value)
//         updateParam('maxPrice', value)
//         break
//       case 'inStock':
//         setInStock(value)
//         updateParam('inStock', value === 'true') // convert string to boolean
//         break
//     }

//     updateParam('page', 1)
//   }

//   const clearFilters = () => {
//     setSearchTerm('')
//     setCategory('')
//     setMinPrice('')
//     setMaxPrice('')
//     setInStock('')
//     setParams([
//       { name: 'page', value: 1 },
//       { name: 'limit', value: 8 },
//       { name: 'sortBy', value: 'createdAt' },
//       { name: 'sortOrder', value: 'desc' },
//     ])
//   }

//   return (
//     <div className='px-4'>
//       <div className='relative max-w-xl mx-auto my-4'>
//         <Search className='absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2' />
//         <Input
//           placeholder='Search by name or category...'
//           className='pl-10'
//           value={searchTerm}
//           onChange={handleChangeFilter}
//           name='search'
//         />
//       </div>

//       <div className='flex flex-wrap items-center justify-between gap-4 my-4'>
//         <Select
//           value={category}
//           onValueChange={(value) =>
//             handleChangeFilter({
//               target: { name: 'category', value } ,
//             })
//           }
//         >
//           <SelectTrigger className='w-48'>
//             <SelectValue placeholder='Filter by Category' />
//           </SelectTrigger>
//           <SelectContent>
//             {allProductCategories?.map((category) => (
//               <SelectItem key={category} value={category}>
//                 {category}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select
//           value={inStock}
//           onValueChange={(value) =>
//             handleChangeFilter({
//               target: { name: 'inStock', value } ,
//             })
//           }
//         >
//           <SelectTrigger className='w-48'>
//             <SelectValue placeholder='Availability' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='true'>In Stock</SelectItem>
//             <SelectItem value='false'>Out of Stock</SelectItem>
//           </SelectContent>
//         </Select>

//         <Input
//           type='number'
//           className='w-40'
//           name='minPrice'
//           placeholder='Min Price'
//           value={minPrice}
//           onChange={handleChangeFilter}
//         />
//         <Input
//           type='number'
//           className='w-40'
//           name='maxPrice'
//           placeholder='Max Price'
//           value={maxPrice}
//           onChange={handleChangeFilter}
//         />

//         <Select
//           value={params.find((param) => param.name === 'sortBy')?.value}
//           onValueChange={(value) => updateParam('sortBy', value)}
//         >
//           <SelectTrigger className='w-40'>
//             <SelectValue placeholder='Sort By' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='createdAt'>Newest</SelectItem>
//             <SelectItem value='price'>Price</SelectItem>
//             <SelectItem value='name'>Name</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           value={params.find((param) => param.name === 'sortOrder')?.value}
//           onValueChange={(value) => updateParam('sortOrder', value)}
//         >
//           <SelectTrigger className='w-40'>
//             <SelectValue placeholder='Order' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='asc'>Ascending</SelectItem>
//             <SelectItem value='desc'>Descending</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button variant='outline' onClick={clearFilters}>
//           Clear Filters
//         </Button>
//       </div>

//       <div className='my-10 md:my-16'>
//         {isLoading ? (
//           <TextShimmer
//             className='my-12 text-3xl text-center font-charm'
//             duration={0.7}
//           >
//             Fetching products...
//           </TextShimmer>
//         ) : (
//           <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
//             {products?.map((product: TProduct) => (
//               <SingleProduct key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AllProducts
