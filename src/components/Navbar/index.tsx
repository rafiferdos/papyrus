import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

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
      </header>
    </nav>
  )
};

export default Navbar;