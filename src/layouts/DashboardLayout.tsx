/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { useCurrentUser } from '@/redux/features/auth/authSlice'
import { useGetUserQuery } from '@/redux/features/userApi'
import { useAppSelector } from '@/redux/hooks'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  const user = useSelector(useCurrentUser)

  const { userId }: string | any = useAppSelector(useCurrentUser)

  const { data, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  })
  const userData = data?.data

  return (
    <SidebarProvider>
      <AppSidebar userRole={user?.role ?? 'user'} userData={userData} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <div className='hidden md:block '>
              <h1 className='text-2xl inline mr-6'>Hi, Welcome Back</h1>
              <p className='inline font-extrabold text-2xl dark:text-white text-black font-charm'>
                {userData?.name}
              </p>
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 pt-4 '>
          <div className='min-h-[100vh] flex-1 rounded bg-muted/50 p-6'>
            {isLoading ? (
              <div className='flex items-center justify-center h-96'>
              <TextShimmer duration={.7} className='text-center text-3xl'>Loading.....</TextShimmer>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
