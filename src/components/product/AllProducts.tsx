import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { allProductCategories } from "@/constants/global";
import { TextShimmer } from "../ui/text-shimmer";
// import SingleProduct from "./SingleProduct";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Button } from "../ui/button";
// import { useNavigate } from 'react-router-dom';
import { useGetAllProductDataQuery } from "@/redux/features/products/productApi";
import { TQueryParam } from "@/types/global";
import ProductCard from "../ProductCard/ProductCard";

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
  createdAt: string;
  updatedAt: string;
};

const AllProducts: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllProductDataQuery(params);
  // const router = useNavigate();

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (!value) return;
    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : [];
      const filterParams = updatedParams.filter((param) => param.name !== name);
      filterParams.push({ name, value });
      return filterParams;
    });
  };

  const clearFilters = () => {
    setParams([]);
    const searchInput = document.querySelector(
      "input[name='searchTerm']"
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const products = response?.data?.result || [];

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

      <div className="flex items-center w-full gap-4 my-4">
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

        <Button className="text-white bg-red-500" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="my-10 md:my-16">
        {isLoading ? (
          <TextShimmer
            className="my-12 text-3xl text-center font-charm"
            duration={0.7}
          >
            Fetching products...
          </TextShimmer>
        ) : isError ? (
          <p className="text-center text-red-500">Error fetching products!</p>
        ) : products.length === 0 ? (
          <p className="text-lg font-semibold text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: TProduct) => (
              // <SingleProduct key={product._id} product={product} />
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
