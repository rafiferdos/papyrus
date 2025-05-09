import { ScrollReveal } from '@/components/ScrollReveal'
import { allProductCategories } from '@/constants/global'
import { useGetAllProductDataQuery } from '@/redux/Features/products/productApi'
import { TQueryParam } from '@/types/global'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TextShimmer } from '../ui/text-shimmer'

export type TProduct = {
  _id: string
  name: string
  description: string
  image: string
  price: number
  category: string
  brand: string
  inStock: boolean
  quantity: number
  createdAt: string
  updatedAt: string
}

const AllProducts: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOrder, setSortOrder] = useState<'featured' | 'priceLow' | 'priceHigh'>('featured')

  const finalParams: TQueryParam[] = [
    ...(params?.filter((p) => p.name !== 'page' && p.name !== 'limit') || []),
    { name: 'page', value: String(page) },
    { name: 'limit', value: String(limit) },
    { name: 'isDeleted', value: 'false' },
    ...(sortOrder === 'priceLow' ? [{ name: 'sortBy', value: 'price:asc' }] : []),
    ...(sortOrder === 'priceHigh' ? [{ name: 'sortBy', value: 'price:desc' }] : []),
  ]

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllProductDataQuery(finalParams)

  // Update active filter badges
  useEffect(() => {
    const newActiveFilters: string[] = []
    params?.forEach((param) => {
      if (param.name === 'category') {
        newActiveFilters.push(`Category: ${param.value}`)
      } else if (param.name === 'inStock') {
        newActiveFilters.push(`Availability: ${param.value === 'true' ? 'In Stock' : 'Out of Stock'}`)
      } else if (param.name === 'minPrice') {
        newActiveFilters.push(`Min Price: $${param.value}`)
      } else if (param.name === 'maxPrice') {
        newActiveFilters.push(`Max Price: $${param.value}`)
      } else if (param.name === 'searchTerm') {
        newActiveFilters.push(`Search: ${param.value}`)
      }
    })
    setActiveFilters(newActiveFilters)
  }, [params])

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target
    if (!value) return
    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : []
      const filterParams = updatedParams.filter((param) => param.name !== name)
      filterParams.push({ name, value })
      return filterParams
    })
  }

  const removeFilter = (filterText: string) => {
    const [type] = filterText.split(': ')
    let paramName = ''
    
    switch (type) {
      case 'Category':
        paramName = 'category'
        break
      case 'Availability':
        paramName = 'inStock'
        break
      case 'Min Price':
        paramName = 'minPrice'
        break
      case 'Max Price':
        paramName = 'maxPrice'
        break
      case 'Search':
        paramName = 'searchTerm'
        break
    }
    
    setParams((prevParams) => 
      prevParams?.filter((param) => param.name !== paramName) || []
    )
    
    // Clear search input if removing search filter
    if (paramName === 'searchTerm') {
      const searchInput = document.querySelector("input[name='searchTerm']") as HTMLInputElement
      if (searchInput) searchInput.value = ''
    }
  }

  const clearFilters = () => {
    setParams([])
    const searchInput = document.querySelector("input[name='searchTerm']") as HTMLInputElement
    if (searchInput) {
      searchInput.value = ''
    }
  }

  const products = response?.data?.result || []
  const totalProducts = response?.data?.meta?.total || 0

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Header with stats */}
        <div className="flex flex-col justify-between gap-4 pb-4 mb-4 border-b md:items-center md:flex-row">
          <div>
            <h1 className="text-2xl font-bold">Shop Our Collection</h1>
            <p className="text-muted-foreground">
              {totalProducts} products available for your creative needs
            </p>
          </div>
          
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md shadow-sm bg-muted">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                </svg>
                <span className="ml-2 hidden md:inline">Grid</span>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span className="ml-2 hidden md:inline">List</span>
              </Button>
            </div>
          </div>
        </div>
        
{/* Advanced Search & Filter Experience */}
<div className="mb-8">
  {/* Search input with animated background */}
  <motion.div 
    className="relative flex flex-col gap-4 md:flex-row items-center mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative flex-grow group">
      {/* Animated search background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-primary/10 to-violet-500/5 rounded-xl -z-10"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 0.3,
            repeat: 2,
            repeatDelay: 2,
            repeatType: "mirror"
          }}
        >
          <Search className="w-5 h-5" />
        </motion.div>
      </div>

      <Input
        placeholder="Search for pens, notebooks, journals..."
        className="pl-10 py-6 border-2 border-primary/20 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all duration-200 text-base"
        onChange={handleChangeFilter}
        name="searchTerm"
      />

      {/* Dynamic search suggestions - appears on focus */}
      <motion.div 
        className="absolute top-full mt-1 left-0 right-0 bg-card shadow-lg rounded-xl border border-border overflow-hidden z-20 hidden group-focus-within:block"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-1 space-y-1">
          <div className="text-xs text-muted-foreground px-3 py-1">Popular searches</div>
          {['Fountain Pens', 'Leather Journal', 'Wax Seals', 'Calligraphy Set'].map(suggestion => (
            <button 
              key={suggestion} 
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/5 rounded-md"
              onClick={() => {
                const searchInput = document.querySelector("input[name='searchTerm']") as HTMLInputElement;
                if (searchInput) {
                  searchInput.value = suggestion;
                  searchInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }}
            >
              <span className="text-primary/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              {suggestion}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
          
    {/* Enhanced filter toggle button with animation */}
    <motion.button 
      onClick={() => setShowFilters(!showFilters)}
      className={`px-5 py-[10px] rounded-xl flex items-center gap-2 transform transition-all duration-300 relative overflow-hidden ${showFilters 
        ? "bg-primary text-primary-foreground font-medium" 
        : "bg-card border-2 border-primary/20 hover:border-primary/40"}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background animation when active */}
      {showFilters && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-violet-600 to-primary -z-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      )}

      {/* Icon animation */}
      <motion.div
        animate={showFilters ? { rotate: [0, 90, 180] } : { rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SlidersHorizontal size={18} />
      </motion.div>
      
      <span className="font-medium">{showFilters ? "Hide Filters" : "Show Filters"}</span>
      
      <motion.div
        animate={showFilters 
          ? { rotate: 180, translateY: 0 } 
          : { rotate: 0, translateY: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </motion.button>
  </motion.div>
  
  {/* Enhanced filter panel */}
  <AnimatePresence>
    {showFilters && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="overflow-hidden"
      >
        <motion.div 
          className="relative rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl border border-primary/20 overflow-hidden"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-full blur-3xl -z-10 opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <SlidersHorizontal size={16} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Refine Your Selection</h3>
            </div>
            <Button 
              onClick={clearFilters}
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X size={14} />
              <span>Reset</span>
            </Button>
          </div>
          
          {/* Filter sections with animations */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category filter with rich interface */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="flex items-center gap-2 text-base font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                </svg>
                Category
              </label>
              <Select
                onValueChange={(value) => {
                  setParams((prevParams) => {
                    const updatedParams = prevParams ? [...prevParams] : []
                    const filterParams = updatedParams.filter(
                      (param) => param.name !== 'category'
                    )
                    filterParams.push({ name: 'category', value })
                    return filterParams
                  })
                }}
              >
                <SelectTrigger className="w-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {allProductCategories?.map((category) => (
                    <SelectItem key={category} value={category} className="py-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        {category === 'Journals' && '📓'}
                        {category === 'Pens' && '🖋️'}
                        {category === 'Art Supplies' && '🎨'}
                        {category === 'Stationery' && '📝'}
                        {category === 'Books' && '📚'}
                        {category === 'Desk Accessories' && '🗂️'}
                        {category === 'Planners' && '📅'}
                        {category === 'Educational' && '📚'}
                        {!['Journals', 'Pens', 'Art Supplies', 'Stationery', 'Books', 'Desk Accessories', 'Planners', 'Educational'].includes(category) && '📦'}
                      </span>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            
            {/* Availability filter with subtle animation */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label className="flex items-center gap-2 text-base font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m5 11 4-7"/>
                  <path d="m19 11-4-7"/>
                  <path d="M2 11h20"/>
                  <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/>
                  <path d="m9 11 1 9"/>
                  <path d="m3.5 11 1.3-5.7A2 2 0 0 1 6.7 3.4H12"/>
                  <path d="m15 11-1 9"/>
                  <path d="M20.5 11V4"/>
                </svg>
                Availability
              </label>
              <Select
                onValueChange={(value) => {
                  setParams((prevParams) => {
                    const updatedParams = prevParams ? [...prevParams] : []
                    const filterParams = updatedParams.filter(
                      (param) => param.name !== 'inStock'
                    )
                    filterParams.push({ name: 'inStock', value })
                    return filterParams
                  })
                }}
              >
                <SelectTrigger className="w-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Any Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true" className="py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>In Stock</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="false" className="py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Out of Stock</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            {/* Price range with dual slider and visual indicators */}
            <motion.div 
              className="space-y-2 col-span-1 sm:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="flex items-center gap-2 text-base font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M2 17a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4Z"/>
                  <circle cx="8" cy="17" r="2"/>
                  <path d="M10 17h4"/>
                  <circle cx="16" cy="17" r="2"/>
                  <path d="M2 9V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2"/>
                </svg>
                Price Range
              </label>
              
              <div className="flex gap-4 items-center">
                <div className="relative min-w-[90px]">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    onChange={handleChangeFilter}
                    className="pl-8 border-2 border-primary/20 hover:border-primary/40 transition-colors"
                  />
                </div>
                
                <div className="h-1 w-6 bg-primary/20 rounded-full"></div>
                
                <div className="relative min-w-[90px]">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    onChange={handleChangeFilter}
                    className="pl-8 border-2 border-primary/20 hover:border-primary/40 transition-colors"
                  />
                </div>
                
                {/* Price range quick selectors */}
                <div className="hidden md:flex gap-2 ml-4">
                  {[
                    { label: "Under $10", min: "0", max: "10" },
                    { label: "$10-$50", min: "10", max: "50" },
                    { label: "Over $50", min: "50", max: "1000" }
                  ].map(range => (
                    <Button
                      key={range.label}
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-primary/20 hover:bg-primary/5"
                      onClick={() => {
                        const minInput = document.querySelector("input[name='minPrice']") as HTMLInputElement;
                        const maxInput = document.querySelector("input[name='maxPrice']") as HTMLInputElement;
                        
                        if (minInput && maxInput) {
                          minInput.value = range.min;
                          maxInput.value = range.max;
                          // Trigger change events
                          minInput.dispatchEvent(new Event('change', { bubbles: true }));
                          maxInput.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                      }}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional filter options with accordion */}
          <motion.div
            className="mt-6 border-t pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">Additional Filters</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">New</Badge>
                </div>
                <div className="rotate-0 group-open:rotate-180 transition-transform">
                  <ChevronDown size={16} />
                </div>
              </summary>
              <div className="pt-4 grid gap-4 grid-cols-1 md:grid-cols-3">
                {/* Additional filter options could go here: brand, color, etc. */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Material</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Leather", "Paper", "Metal", "Wood"].map(material => (
                      <Button 
                        key={material}
                        variant="outline" 
                        size="sm" 
                        className="justify-start border-primary/20 hover:bg-primary/5 hover:border-primary/30"
                      >
                        <input type="checkbox" className="mr-2 h-4 w-4 rounded border-primary text-primary focus:ring-primary" />
                        {material}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand</label>
                  <Select>
                    <SelectTrigger className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Premium", "Standard", "Economy", "Designer"].map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select
                    value={sortOrder}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onValueChange={(value) => setSortOrder(value as any)}
                  >
                    <SelectTrigger className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Sort Products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="priceLow">Price: Low to High</SelectItem>
                      <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </details>
          </motion.div>

          {/* Apply filters button */}
          <motion.div 
            className="mt-6 flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 text-white"
            >
              <span className="mr-2">Filters Applied</span>
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                        {/* tick svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  
  {/* Active filters badges */}
  <AnimatePresence>
    {activeFilters.length > 0 && (
      <motion.div 
        className="flex flex-wrap gap-2 mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {activeFilters.map((filter) => (
          <motion.div
            key={filter}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <Badge 
              variant="outline"
              className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 border-primary/20 text-sm font-medium"
            >
              <span>{filter}</span>
              <button 
                onClick={() => removeFilter(filter)}
                className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-xs transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          </motion.div>
        ))}
        
        {activeFilters.length > 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            <span>Clear all</span>
            <X size={12} />
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>

        {/* Products display */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-12 h-12">
                  <motion.div 
                    className="absolute w-12 h-12 border-4 border-primary rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <TextShimmer className="text-xl font-medium" duration={1}>
                  Loading your products...
                </TextShimmer>
              </div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 bg-red-100 rounded-full p-4 dark:bg-red-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Oops! Something went wrong</h3>
              <p className="text-muted-foreground">
                We couldn't load the products. Please try again later.
              </p>
              <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                Refresh Page
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 bg-amber-100 dark:bg-amber-900/20 rounded-full p-4">
                <ShoppingBag className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold">No products found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any products matching your criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <ScrollReveal>
              <motion.div 
                layout
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "flex flex-col gap-4"
                }
              >
                <AnimatePresence>
                  {products.map((product: TProduct) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={viewMode === 'list' ? "w-full bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border" : ""}
                    >
                      {viewMode === 'grid' ? (
                        <ProductCard product={product} />
                      ) : (
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4 h-48">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="flex flex-col justify-between p-4 w-full md:w-3/4">
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <Badge variant={product.inStock ? "default" : "secondary"}>
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </Badge>
                              </div>
                              <Badge variant="outline" className="mt-1 mb-2">
                                {product.category}
                              </Badge>
                              <p className="text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
                              <Button size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          )}
        </div>
        
        {/* Pagination */}
        {response?.data?.meta && (
          <div className="flex flex-col items-center pt-8 mt-4 border-t space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(1)}
                className={page === 1 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span className="ml-1">Previous</span>
              </Button>

              <div className="flex items-center px-4">
                <span className="text-sm font-medium">
                  Page {response.data.meta.page} of {response.data.meta.totalPage}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page === response.data.meta.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
                className={page === response.data.meta.totalPage ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <span className="mr-1">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page === response.data.meta.totalPage}
                onClick={() => setPage(response.data.meta.totalPage)}
                className={page === response.data.meta.totalPage ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Showing {(response.data.meta.page - 1) * response.data.meta.limit + 1}–
              {Math.min(
                response.data.meta.page * response.data.meta.limit,
                response.data.meta.total
              )} of {response.data.meta.total} products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts