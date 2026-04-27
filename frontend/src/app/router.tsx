import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import ContractorsPage from '../features/admin/pages/ContractorsPage'
import InviteAccessPage from '../features/onboarding/pages/InviteAccessPage'
import OnboardingHomePage from '../features/onboarding/pages/OnboardingHomePage'
import AdminLayout from '../shared/layout/AdminLayout'
import PublicLayout from '../shared/layout/PublicLayout'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<OnboardingHomePage />} />
          <Route path="/onboarding" element={<OnboardingHomePage />} />
          <Route path="/invite/:token" element={<InviteAccessPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="contractors" element={<ContractorsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
