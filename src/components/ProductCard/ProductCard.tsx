import React from "react";
import { Link } from "react-router-dom";

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
  const { _id, name, price, image, quantity, brand,createdAt, updatedAt } =
    product;
  console.log(product);
  const isInStock = quantity > 0;
  const salePrice = +(price * 0.8).toFixed(2);

  const now = new Date().getTime();
  const createdDiff = now - new Date(createdAt).getTime();
  const updatedDiff = now - new Date(updatedAt).getTime();
  const isNew =
    createdDiff < 24 * 60 * 60 * 1000 && updatedDiff < 24 * 60 * 60 * 1000;

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out group cursor-pointer">
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
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              New
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {brand}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 pb-1">
          {name}
        </h3>
        <span
          className={` text-sm font-medium px-3 py-1  rounded-3xl ${
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
            <div className="text-lg font-bold">
              <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                <span className="text-pink-600">${salePrice}</span>
                <span className="text-sm line-through text-gray-400">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/products/${_id}`}
            className={`block w-full text-center mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-600`}
          >
            View Details
          </Link>
      
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
