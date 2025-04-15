import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;

  quantity: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, name, price, image, quantity, brand, createdAt, updatedAt } =
    product;
  const isInStock = quantity > 0;
  const dicountPrice = +(product?.price * 2).toFixed(2);

  const now = new Date().getTime();
  const createdDiff = now - new Date(createdAt).getTime();
  const updatedDiff = now - new Date(updatedAt).getTime();
  const isNew =
    createdDiff < 24 * 60 * 60 * 1000 && updatedDiff < 24 * 60 * 60 * 1000;

  return (
    <Link to={`/products/${_id}`}>
      <div className="mx-auto max-w-sm bg-white dark:bg-black rounded-2xl shadow-lg dark:hover:shadow-indigo-950 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out group cursor-pointer">
        <div className="relative p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="absolute top-8 left-8 flex flex-col gap-2">
            {isNew && (
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-roboto font-bold px-3 py-1 rounded-full shadow">
                New
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="font-roboto text-xs font-roboto text-gray-400 uppercase tracking-wider mb-1">
            {brand}
          </div>

          <h3 className="font-roboto text-lg font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:hover:text-indigo-600 transition-colors duration-300 pb-1">
            {name}
          </h3>
          <span
            className={`font-roboto text-xs font-medium px-3 py-1  rounded-3xl ${
              isInStock
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>

          <div
            className="text-xl font-bold text-gray-800
        my-2"
          >
            <div className="flex items-center justify-between mt-2">
              <div className="text-xl font-roboto font-bold">
                <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                  <span className="text-pink-600">${price.toFixed(2)}</span>
                  <span className="text-sm line-through text-gray-400">
                    ${dicountPrice}
                  </span>
                </div>
              </div>
            </div>
      
              <Button variant={"primary"} className="w-full  mt-3">
                View Details
              </Button>
      
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
