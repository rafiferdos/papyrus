import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { FixedElement } from 'react-nice-scroll'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
<>
    <div className=" relative z-[50]">
    <FixedElement left={0} top={0}>
       <Navbar />
     </FixedElement>
    </div>
    <div className="h-8"></div>
    <div className='container mx-auto max-w-7xl md:w-10/12 w-11/12'>
      <div className='lg:min-h-[calc(100vh-5rem)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  )
}
