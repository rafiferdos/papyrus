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
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const finalParams: TQueryParam[] = [
    ...(params?.filter((p) => p.name !== "page" && p.name !== "limit") || []),
    { name: "page", value: String(page) },
    { name: "limit", value: String(limit) },
  ];

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllProductDataQuery(finalParams);

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
  const allProduct = response || [];
  console.log(products);
  console.log(allProduct);
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

      <div className="flex flex-wrap items-center w-full gap-4 my-4 md:flex-nowrap ">
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
          <div className="flex items-center justify-center min-h-[60vh]">
            <TextShimmer className="text-xl font-medium" duration={1}>
              Loading products....
            </TextShimmer>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Error fetching products!</p>
        ) : products.length === 0 ? (
          <p className="text-lg font-semibold text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: TProduct) => (
              // <SingleProduct key={product._id} product={product} />
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {response?.data?.meta && (
          <div className="flex flex-col items-center mt-6 space-y-2">
       

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              <Button
              variant={"primary"}
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
              >
                Previous
              </Button>

              <span className="px-4 py-2 border rounded">
                Page {response.data.meta.page} of {response.data.meta.totalPage}
              </span>

              <Button
                disabled={page === response.data.meta.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
                variant={"primary"}
                className={
                  page === response.data.meta.totalPage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                Next
              </Button>
            </div>
                 {/* Showing Range Text */}
                 <p className="text-sm text-gray-700 dark:text-white">
              Showing{" "}
              {(response.data.meta.page - 1) * response.data.meta.limit + 1}–
              {Math.min(
                response.data.meta.page * response.data.meta.limit,
                response.data.meta.total
              )}{" "}
              of {response.data.meta.total} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
