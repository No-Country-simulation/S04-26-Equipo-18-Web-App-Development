import { Navigate, Outlet, useParams } from 'react-router-dom'
import { getContractorSession } from '../session'

const RequireContractorAuth = () => {
  const session = getContractorSession()
  const { contractorId } = useParams()

  if (!session?.contractorId && !session?.email) {
    return <Navigate to="/contractor/auth" replace />
  }

  if (contractorId && session.contractorId && contractorId !== session.contractorId) {
    return <Navigate to={`/onboarding/${session.contractorId}`} replace />
  }

  return <Outlet />
}

export default RequireContractorAuth
