import { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Search, X, SlidersHorizontal, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'
import { allProductCategories } from '@/constants/global'
import { TextShimmer } from '../ui/text-shimmer'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../ui/select'
import { Button } from '../ui/button'
import { useGetAllProductDataQuery } from '@/redux/Features/products/productApi'
import { TQueryParam } from '@/types/global'
import ProductCard from '../ProductCard/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import { ScrollReveal } from '@/components/ScrollReveal'

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
        
        {/* Search and filter bar */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              onChange={handleChangeFilter}
              name="searchTerm"
            />
          </div>
          
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4 rounded-lg border bg-card">
                <h3 className="font-semibold">Filter Products</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {allProductCategories?.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">In Stock</SelectItem>
                        <SelectItem value="false">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        className="max-w-sm"
                        name="minPrice"
                        placeholder="Min"
                        onChange={handleChangeFilter}
                      />
                      <Input
                        type="number"
                        className="max-w-sm"
                        name="maxPrice"
                        placeholder="Max"
                        onChange={handleChangeFilter}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      onClick={clearFilters}
                      variant="destructive" 
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge 
                key={filter} 
                variant="outline"
                className="px-3 py-1 bg-primary/10 hover:bg-primary/20"
              >
                {filter}
                <button 
                  onClick={() => removeFilter(filter)}
                  className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        )}

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