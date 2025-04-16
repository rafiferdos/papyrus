import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import errorImg from '@/assets/404.png'
import { ArrowLeft, Home } from 'lucide-react'

export default function ErrorPage() {
  // Function to handle going back to the previous page
  const handleGoBack = () => {
    window.history.back()
  }
  return (
    <div className='flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
      <div className='w-full space-y-6 text-center'>
        <div className='max-w-xs mx-auto'>
          <img src={errorImg} alt='' />
        </div>
        <div className='space-y-3'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>
            Oops! Lost in Cyberspace
          </h1>
          <p className='text-gray-500'>
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            variant='outline'
            onClick={handleGoBack}
            className='flex items-center gap-2'
          >
            <ArrowLeft size={16} />
            Back to Previous Page
          </Button>
          <Button variant='default' asChild className='flex items-center gap-2'>
            <Link to='/'>
              <Home size={16} />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
