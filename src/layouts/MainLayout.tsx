import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='container mx-auto max-w-7xl md:w-10/12 w-11/12'>
      <Navbar />
      <div className='lg:min-h-[calc(100vh-5rem)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
