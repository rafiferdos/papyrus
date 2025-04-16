import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import errorImg from '@/assets/404.png'

export default function ErrorPage() {
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
        <Button variant='default' asChild>
          <Link to='/'>Return to website</Link>
        </Button>
      </div>
    </div>
  )
}
