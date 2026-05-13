import AdminHeader from "../components/AdminHeader"
import { ContractorTable } from "../components/ContractorTable"
import StatsCards from "../components/StatsCard"

const AdminDashboardPage = () => {
  return (
    <section className="space-y-4">
      <AdminHeader title="Panel" subtitle="Supervisá y gestioná el onboarding de contratistas" />

      <div className="p-6 space-y-6">
        <StatsCards />
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Contratistas recientes
          </h2>
          <ContractorTable />
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage
