import AllProducts from "@/components/product/AllProducts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Stars, Tag, Truck } from "lucide-react";
import { useEffect, useState } from "react";

const AllProductsPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [categoryHovered, setCategoryHovered] = useState<string | null>(null);
  
  // Track scroll position for animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Featured categories with icons
  const featuredCategories = [
    { name: "Stationery", icon: "📝", color: "bg-purple-50 dark:bg-purple-900/20" },
    { name: "Books", icon: "📚", color: "bg-blue-50 dark:bg-blue-900/20" },
    { name: "Art Supplies", icon: "🎨", color: "bg-pink-50 dark:bg-pink-900/20" },
    { name: "Journals", icon: "📓", color: "bg-green-50 dark:bg-green-900/20" },
  ];

  return (
    <div className="space-y-16 my-8 md:my-0 pt-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden rounded-2xl">
        {/* Decorative elements */}
        <motion.div 
          className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-40 h-40 bg-primary/10 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ 
                duration: Math.random() * 5 + 10, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: Math.random() * 5
              }}
            />
          ))}
        </motion.div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary inline-flex items-center gap-1">
                <Sparkles size={12} className="animate-pulse" />
                Premium Quality Products
              </span>
            </motion.div>
            
            <motion.div
              className="relative mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Background decorative element */}
              <motion.div 
                className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 dark:opacity-20"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ 
                  scale: [0.8, 1.05, 0.95, 1],
                  rotate: [-5, 2, -2, 0]
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary">
                  <path d="M40.4,-69.2C52.2,-62.3,61.8,-51.2,69.8,-38.6C77.7,-26,84,-12,83.5,1.7C82.9,15.4,75.4,30.8,65.8,43.4C56.2,56,44.5,65.9,31.1,71.3C17.7,76.6,2.7,77.5,-11.4,74.2C-25.5,70.9,-38.6,63.4,-50.7,53.4C-62.8,43.4,-73.8,30.9,-79,16.4C-84.2,1.9,-83.5,-14.6,-77.4,-28.6C-71.3,-42.6,-59.8,-54.1,-46.4,-60.3C-32.9,-66.5,-17.5,-67.5,-1.8,-64.9C13.9,-62.3,28.5,-56.1,40.4,-49.1Z" transform="translate(100 100)" />
                </svg>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Split text for individual letter animations */}
                <span className="block">Find Your Perfect</span>
                <span className="relative inline-block">
                  {/* Decorative underline for Papyrus */}
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-500 to-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  />
                  
                  {/* 3D effect for brand name */}
                  <span className="relative font-charm italic inline-block">
                    <motion.span
                      initial={{ opacity: 0, scale: 1.4, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="inline-block"
                    >
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Papyrus
                      </span>
                      
                      {/* Text shadow element */}
                      <span className="absolute -z-10 left-0.5 top-0.5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 opacity-30 blur-[2px]">
                        Papyrus
                      </span>
                    </motion.span>
                  </span>
                </span>
                <span className="block">Products</span>
                
                {/* Animated sparkles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400"
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      x: Math.random() * 200 - 100, 
                      y: Math.random() * 100 - 50,
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: 1 + Math.random() * 2,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 8 + 5
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z" fill="currentColor" />
                    </svg>
                  </motion.div>
                ))}
              </motion.h1>
            </motion.div>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover our curated collection of premium stationery, art supplies, and reading essentials for all your creative and academic needs.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-14"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {featuredCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className={cn(
                    "px-6 py-4 rounded-xl cursor-pointer transition-all flex items-center gap-3",
                    category.color,
                    categoryHovered === category.name ? "shadow-lg scale-105" : "shadow"
                  )}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setCategoryHovered(category.name)}
                  onMouseLeave={() => setCategoryHovered(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Benefit icons */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                  <Truck size={24} />
                </div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                  <Tag size={24} />
                </div>
                <p className="text-sm font-medium">Exclusive Deals</p>
                <p className="text-xs text-muted-foreground">Member discounts</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Quality Guarantee</p>
                <p className="text-xs text-muted-foreground">100% satisfaction</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                  <Stars size={24} />
                </div>
                <p className="text-sm font-medium">Loyalty Rewards</p>
                <p className="text-xs text-muted-foreground">Earn with every purchase</p>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => window.scrollTo({
                  top: window.innerHeight * 0.8,
                  behavior: "smooth"
                })}
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-sm text-muted-foreground mb-2">Explore Products</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={20} className="text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-primary/5 py-12 border-y rounded-4xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">500+</p>
              <p className="text-sm text-muted-foreground">Products Available</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">12k+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">24/7</p>
              <p className="text-sm text-muted-foreground">Customer Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main products section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <AllProducts />
      </motion.section>
    </div>
  );
};

export default AllProductsPage;