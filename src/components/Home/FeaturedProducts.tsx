import { useGetAllProductDataQuery } from '@/redux/Features/productManagement/productApi'
import { SkeletonCard } from '../Skeletons/SkeletonCard'
import { TProduct } from '../AllProducts/AllProducts'
import OneProduct from '../AllProducts/OneProduct'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const FeaturedProducts = () => {
  const { data: response, isLoading } = useGetAllProductDataQuery('')
  const products = response?.data || response?.data?.result || []
  return (
    <>
      <div className='space-y-8 py-12 md:py-24 lg:py-32'>
        <div>
          <h1 className='text-center text-2xl md:text-3xl font-thin'>
            <span className='font-charm text-3xl md:text-4xl'>DESIGNED </span>
            by us,{' '}
            <span className='font-charm text-3xl md:text-4xl'>
              PERSONALIZED{' '}
            </span>
            by you.
          </h1>
        </div>
        <div>
          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            // show latest 6 products
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {products?.slice(-6).map((product: TProduct) => (
                <OneProduct key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center'>
          <Button variant='default'>
            <Link to='/products'>View All Products</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default FeaturedProducts
