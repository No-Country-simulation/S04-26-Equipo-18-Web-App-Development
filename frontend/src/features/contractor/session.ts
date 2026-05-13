export const CONTRACTOR_SESSION_KEY = 'northpay-contractor-auth'

export interface ContractorSession {
  contractorId?: string
  email?: string
  invitationToken?: string
}

export const getContractorSession = (): ContractorSession | null => {
  const raw = window.localStorage.getItem(CONTRACTOR_SESSION_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as ContractorSession
  } catch {
    window.localStorage.removeItem(CONTRACTOR_SESSION_KEY)
    return null
  }
}

export const saveContractorSession = (session: ContractorSession) => {
  window.localStorage.setItem(CONTRACTOR_SESSION_KEY, JSON.stringify(session))
}

export const clearContractorSession = () => {
  window.localStorage.removeItem(CONTRACTOR_SESSION_KEY)
}
