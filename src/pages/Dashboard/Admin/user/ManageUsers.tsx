import ManageUser from "@/components/dashboard/user/ManageUser";
import { useGetAllUsersQuery } from "@/redux/features/userApi";

const ManageUsers = () => {
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ManageUser users={allUsers || []} refetch={refetch} />
    </>
  );
};

export default ManageUsers;
