import ManageUser from '@/components/dashboard/user/ManageUser'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { useGetAllUsersQuery } from '@/redux/features/userApi'

const ManageUsers = () => {
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery()

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-96">
        <TextShimmer>Loading...</TextShimmer>
      </div>
    )

  return (
    <>
      <ManageUser users={allUsers || []} refetch={refetch} />
    </>
  )
}

export default ManageUsers
