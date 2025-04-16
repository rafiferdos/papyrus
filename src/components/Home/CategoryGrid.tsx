import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Category = {
  name: string;
  image: string;
};

interface CategoryGridProps {
  categories: Category[];
}





const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} to={`/category/${category.name.toLowerCase()}`}>
            <Card
              className={cn(
                "overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
              )}
            >
              <div className="h-40 md:h-48 lg:h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="text-center py-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
