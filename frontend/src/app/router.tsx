import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import InviteAccessPage from '../features/onboarding/pages/InviteAccessPage'
import OnboardingHomePage from '../features/onboarding/pages/OnboardingHomePage'
import AdminLayout from '../shared/layout/AdminLayout'
import PublicLayout from '../shared/layout/PublicLayout'
import AdminContractorPage from '@/features/admin/pages/AdminContractorPage'
import AdminAuthPage from '@/features/admin/auth/pages/AdminAuthPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<OnboardingHomePage />} />
          <Route path="/onboarding" element={<OnboardingHomePage />} />
          <Route path="/invite/:token" element={<InviteAccessPage />} />

          <Route path="/auth/login" element={<AdminAuthPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="contractor/:id" element={<AdminContractorPage />} />
          <Route path="notifications" element={<AdminDashboardPage />} />
          <Route path="settings" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
