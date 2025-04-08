import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import MountainIcon from '../icons/MountainIcon'
import MenuIcon from '../icons/MenuIcon'
import { ModeToggle } from '../icons/ModeToggle'
import { AnimatedBackground } from '../ui/animated-background'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { ShoppingCart } from 'lucide-react'
import { GlowEffect } from '../ui/glow-effect'

const Navbar = () => {
  const Tabs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ]
  return (
    <nav>
      <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
        {/* mobile menu */}
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
              <span className='sr-only'>NoteNest</span>
            </Link>
            {/* Mobile Menu Links */}
            <div className='grid gap-2 py-6'>
              {Tabs.map((tab) => (
                <Link
                  to={tab.href}
                  key={tab.name}
                  data-id={tab.name}
                  type='button'
                  className={`px-2 py-0.5 transition-colors duration-300 
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
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <Link to='/' className='mr-6 hidden lg:flex'>
          <MountainIcon className='h-6 w-6' />
          <span className='sr-only'>NoteNest</span>
        </Link>
        <nav className='ml-auto hidden lg:flex gap-6 items-center'>
          <AnimatedBackground
            defaultValue={Tabs[0].name}
            className='border border-b-yellow-200 dark:border-b-yellow-600 border-t-0 border-l-0 border-r-0'
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
                      ? 'text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-yellow-200 dark:border-b-yellow-600'
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
                  <Button variant='ghost' size='sm' asChild>
                    <Link to={'/cart'}>
                      <ShoppingCart />
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
          {/* {token ? (
            <Button variant='destructive' size='sm' onClick={handleLogout}>
              <LogOut className='h-4 w-4 mr-2' />
              Logout
            </Button>
          ) : (
            <Button variant='default' size='sm' asChild>
              <Link to={'/register'}>Sign Up</Link>
            </Button>
          )} */}
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
    </nav>
  )
}

export default Navbar
