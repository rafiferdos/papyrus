import { Button } from '@/components/ui/button'
import bannerImage from '../../assets/book-pencil.png'
import { TextLoop } from '../ui/text-loop'
import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between lg:mt-16 mt-8 rounded-lg gap-6 md:gap-12 bg-gray-50 dark:bg-gray-950 p-6 md:p-12'>
      <div className='flex-1'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50'>
          Welcome to{' '}
          <TextLoop
            className='overflow-y-clip font-charm'
            transition={{
              type: 'spring',
              stiffness: 900,
              damping: 80,
              mass: 10,
            }}
            variants={{
              initial: {
                y: 20,
                rotateX: 90,
                opacity: 0,
                filter: 'blur(20px)',
              },
              animate: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: 'blur(0px)',
              },
              exit: {
                y: -20,
                rotateX: -90,
                opacity: 0,
                filter: 'blur(4px)',
              },
            }}
          >
            <span>Papyrus</span>
            <span>Stationary Shop</span>
            <span>Library</span>
          </TextLoop>
        </h2>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Your one-stop destination for all your stationary needs. Explore our
          wide range of products and enjoy exclusive discounts!
        </p>
        <div className='mt-4 flex items-center gap-2'>
          <span className='text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-50'>
            Scroll down for{' '}
            <span className='text-sm md:text-base line-through text-gray-500 dark:text-gray-400'>
              less
            </span>{' '}
            more
          </span>
        </div>
        <div className='mt-6'>
          <Button asChild className='w-full md:w-auto'>
            <Link to='/products'>See Products</Link>
          </Button>
        </div>
      </div>
      <div className='w-full md:w-1/2'>
        <img
          src={bannerImage}
          alt='Product Image'
          width={500}
          height={500}
          className='w-full h-64 md:h-auto object-cover rounded-lg'
          style={{ aspectRatio: '500/500', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
