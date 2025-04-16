import { ChevronsUpDown, LogOut, Moon, Sun } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/features/auth/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/providers/theme-provider'
import { Button } from '@/components/ui/button'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
    role: string
  }
}) {
  const { isMobile } = useSidebar()
  const { setTheme, theme } = useTheme()
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    Navigate('/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src='https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg'
                  alt={user.name}
                />
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src='https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg'
                    alt={user.name}
                  />
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className='p-2'>
              <p className='text-xs text-muted-foreground mb-2'>Theme</p>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className={`flex-1 ${theme === 'light' ? 'bg-accent' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <Sun className='h-4 w-4 mr-1' /> Light
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className={`flex-1 ${theme === 'dark' ? 'bg-accent' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <Moon className='h-4 w-4 mr-1' /> Dark
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className='p-2'>
              <Button
                variant='destructive'
                size='sm'
                className='w-full justify-start'
                onClick={handleLogout}
              >
                <LogOut className='h-4 w-4 mr-2' />
                Log out
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
