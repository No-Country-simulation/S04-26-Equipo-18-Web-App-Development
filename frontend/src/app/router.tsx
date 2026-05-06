import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import OnboardingHomePage from '../features/onboarding/pages/OnboardingHomePage'
import AdminLayout from '../shared/layout/AdminLayout'
import PublicLayout from '../shared/layout/PublicLayout'
import AdminContractorPage from '@/features/admin/pages/AdminContractorPage'
import AdminAuthPage from '@/features/admin/auth/pages/AdminAuthPage'
import ContractorAuthPage from '@/features/contractor/pages/ContractorAuthPage'
import InviteAccessPage from '@/features/onboarding/pages/InviteAccessPage'
import OnboardingFlowPage from '@/features/onboarding/pages/OnboardingFlowPage'
import AdminNotificationsPage from '@/features/admin/pages/AdminNotificationsPage'
import AdminSettingsPage from '@/features/admin/pages/AdminSettingsPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<OnboardingHomePage />} />
          <Route path="/onboarding" element={<OnboardingHomePage />} />
          <Route path="/invite/:token" element={<InviteAccessPage />} />
          <Route path="/contractor/auth" element={<ContractorAuthPage />} />
          <Route path="/onboarding/demo" element={<OnboardingFlowPage />} />
          <Route path="/onboarding/:contractorId" element={<OnboardingFlowPage />} />
          <Route path="/auth/admin/login" element={<AdminAuthPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="contractor/:id" element={<AdminContractorPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
