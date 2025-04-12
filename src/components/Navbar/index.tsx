import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MountainIcon from '../icons/MountainIcon'
import MenuIcon from '../icons/MenuIcon'
import { GlowEffect } from '../ui/glow-effect'
import { ModeToggle } from '../icons/ModeToggle'
import { AnimatedBackground } from '../ui/animated-background'
import { LogOut, ShoppingCart } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { useDispatch, useSelector } from 'react-redux'

import toast from 'react-hot-toast'
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from '@/redux/features/auth/authSlice'
import { RootState } from '@/redux/store'
import { Badge } from '../ui/badge'

export default function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = useSelector(useCurrentToken)
  const navigate = useNavigate()

  const user = useSelector(useCurrentUser)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAdmin = user?.role === 'admin'

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items)

  // Calculate total items in cart by summing all quantities
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const Tabs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Profile', href: '/profile' },
  ]

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    //todo: fixed to top
    <nav className='w-screen  bg-white dark:bg-black shadow-md'>
      <div className='container mx-auto max-w-7xl md:w-10/12 w-11/12'>
        <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='lg:hidden'>
                <MenuIcon className='h-6 w-6' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <Link to='/' className='mr-6 hidden lg:flex'>
                <MountainIcon className='h-6 w-6' />
                <span className='sr-only '>Papyrus</span>
              </Link>
              {/* Mobile Menu Links */}
              <div className='grid gap-2 py-6  pl-7 mt-5'>
                {Tabs.map((tab) => (
                  <Link
                    to={tab.href}
                    key={tab.name}
                    data-id={tab.name}
                    type='button'
                    className={`w-[75px] px-2 py-0.5 transition-colors duration-300 
                    ${
                      location.pathname === tab.href
                        ? 'text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-yellow-200 dark:border-b-yellow-600' // Active state with bold and underline
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50' // Normal state with hover
                    }`}
                  >
                    {tab.name}
                  </Link>
                ))}
                <div className='relative'>
                  <ModeToggle />
                </div>
                <div className='w-auto'>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          className='relative'
                          size='sm'
                          asChild
                        >
                          <Link to={'/cart'}>
                            <ShoppingCart />
                            {totalItemsInCart > 0 && (
                              <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]'>
                                {totalItemsInCart}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className='w-auto'>
                  {token ? (
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={handleLogout}
                    >
                      <LogOut className='h-4 w-4 mr-2' />
                      Logout
                    </Button>
                  ) : (
                    <Button variant='default' size='sm' asChild>
                      <Link to={'/register'}>Sign Up</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Links */}
          <Link to='/' className='mr-6 flex items-center gap-2 hidden lg:flex'>
            <MountainIcon className='h-6 w-6' />
            <span className='text-xl font-semibold'>Papyrus</span>
          </Link>
          <nav className='ml-auto hidden lg:flex gap-6 items-center'>
            <AnimatedBackground
              defaultValue={Tabs[0].name}
              className='border border-b-indigo-500 dark:border-b-indigo-600 border-t-0 border-l-0 border-r-0'
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 1,
              }}
              enableHover
            >
              {Tabs.map((tab) => (
                <Link
                  to={tab.href}
                  key={tab.name}
                  data-id={tab.name}
                  type='button'
                  className={`px-2 py-0.5 transition-colors duration-300
                  ${
                    location.pathname === tab.href
                      ? '  text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-indigo-500 dark:border-b-indigo-600'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </AnimatedBackground>
            <div>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      className='relative'
                      size='sm'
                      asChild
                    >
                      <Link to={'/cart'}>
                        <ShoppingCart />
                        {totalItemsInCart > 0 && (
                          <Badge
                            variant='outline'
                            className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]'
                          >
                            {totalItemsInCart}
                          </Badge>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Display dashboard button only if user is admin */}
              {/* {isAdmin && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' size='sm' asChild>
                      <Link to={'/dashboard'}>
                        <UserRound />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Admin Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )} */}
            </div>
            {token ? (
              <Button variant='destructive' size='sm' onClick={handleLogout}>
                <LogOut className='h-4 w-4 mr-2' />
                Logout
              </Button>
            ) : (
              <Button variant='primary' size='sm' asChild>
                <Link to={'/register'}>Sign Up</Link>
              </Button>
            )}
            <div className='relative'>
              <GlowEffect
                colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
                mode='colorShift'
                blur='soft'
                duration={3}
                scale={0.9}
              />
              <div className='relative'>
                <ModeToggle />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </nav>
  )
}
