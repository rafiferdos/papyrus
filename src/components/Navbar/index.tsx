import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MountainIcon from '../icons/MountainIcon'
import MenuIcon from '../icons/MenuIcon'
import { GlowEffect } from '../ui/glow-effect'
import { ModeToggle } from '../icons/ModeToggle'
import { AnimatedBackground } from '../ui/animated-background'
import { LogOut, ShoppingCart, User } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'

export default function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = useSelector(useCurrentToken)
  const navigate = useNavigate()

  const user = useSelector(useCurrentUser)

  const isAdmin = user?.role === 'admin'

  // Get cart items from Redux store
const cartProducts =
  useSelector((state: RootState) => state.cart.products) || []  // // Calculate total items in cart by summing all quantities
  // const totalItemsInCart = cartItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // )
  const Tabs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ]

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U'
    return user.name
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <nav className='w-screen bg-white dark:bg-black shadow-md'>
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
                <span className='sr-only'>Papyrus</span>
              </Link>
              {/* Mobile Menu Links */}
              <div className='grid gap-2 py-6 pl-7 mt-5'>
                {Tabs.map((tab) => (
                  <Link
                    to={tab.href}
                    key={tab.name}
                    data-id={tab.name}
                    type='button'
                    className={`w-[75px] px-2 py-0.5 transition-colors duration-300 
                    ${
                      location.pathname === tab.href
                        ? 'text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-yellow-200 dark:border-b-yellow-600'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50'
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
                            {cartProducts.length > 0 && (
                              <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-[10px]'>
                                {cartProducts.length}
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

                {/* Mobile User Menu */}
                <div className='w-auto'>
                  {token ? (
                    <div className='space-y-2'>
                      <Link to='/profile'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-full justify-start'
                        >
                          <User className='h-4 w-4 mr-2' />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant='destructive'
                        size='sm'
                        onClick={handleLogout}
                        className='w-full justify-start'
                      >
                        <LogOut className='h-4 w-4 mr-2' />
                        Logout
                      </Button>
                    </div>
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
          <Link to='/' className='mr-6 flex items-center gap-2 lg:flex'>
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
                      ? 'text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-indigo-500 dark:border-b-indigo-600'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </AnimatedBackground>

            {/* Cart Icon */}
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
                        {cartProducts.length > 0 && (
                          <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-[10px]'>
                            {cartProducts.length}
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

            {/* User Profile or Sign Up */}
            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full h-8 w-8 p-0'
                  >
                    <Avatar className='h-8 w-8 cursor-pointer'>
                      <AvatarFallback className='bg-indigo-600 text-white'>
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to='/profile' className='cursor-pointer'>
                      <User className='mr-2 h-4 w-4' />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to='/dashboard' className='cursor-pointer'>
                        <User className='mr-2 h-4 w-4' />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className='text-red-600 focus:text-red-600 cursor-pointer'
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant='primary' size='sm' asChild>
                <Link to={'/register'}>Sign Up</Link>
              </Button>
            )}

            {/* Theme Toggle */}
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
