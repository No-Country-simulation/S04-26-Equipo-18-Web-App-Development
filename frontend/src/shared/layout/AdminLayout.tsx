import AdminSidebar from '@/features/admin/components/AdminSidebar'
import { Outlet } from 'react-router-dom'




const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />

      <main className="ml-64 px-5 py-6">
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout
