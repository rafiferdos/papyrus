import ManageUser from "@/components/dashboard/user/ManageUser";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGetAllUsersQuery } from "@/redux/features/userApi";

const ManageUsers = () => {
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery();

  if (isLoading) return <TextShimmer>Loading...</TextShimmer>

  return (
    <>
      <ManageUser users={allUsers || []} refetch={refetch} />
    </>
  );
};

export default ManageUsers;
