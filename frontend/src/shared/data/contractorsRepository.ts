import { contractors as seedContractors } from '@/app/store'
import type { Contractor } from '@/shared/types'

const STORAGE_KEY = 'northpay-contractors-repository-v1'

type Listener = () => void
const listeners = new Set<Listener>()

const cloneContractor = (contractor: Contractor): Contractor => ({
  ...contractor,
  invitedAt: new Date(contractor.invitedAt),
  lastUpdatedAt: new Date(contractor.lastUpdatedAt),
  contractSignedAt: contractor.contractSignedAt ? new Date(contractor.contractSignedAt) : undefined,
  documents: contractor.documents.map((document) => ({
    ...document,
    uploadedAt: new Date(document.uploadedAt),
  })),
})

const hydrateContractor = (contractor: Contractor): Contractor => cloneContractor(contractor)

const serializeContractor = (contractor: Contractor) => ({
  ...contractor,
  invitedAt: contractor.invitedAt.toISOString(),
  lastUpdatedAt: contractor.lastUpdatedAt.toISOString(),
  contractSignedAt: contractor.contractSignedAt ? contractor.contractSignedAt.toISOString() : undefined,
  documents: contractor.documents.map((document) => ({
    ...document,
    uploadedAt: document.uploadedAt.toISOString(),
  })),
})

const notify = () => {
  listeners.forEach((listener) => listener())
}

const readStorage = (): Contractor[] | null => {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Contractor[]
    return parsed.map(hydrateContractor)
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

const writeStorage = (items: Contractor[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(serializeContractor)))
  notify()
}

const ensureSeedData = () => {
  const existing = readStorage()
  if (existing) {
    return existing
  }

  const seeded = seedContractors.map(cloneContractor)
  writeStorage(seeded)
  return seeded
}

export const subscribeContractors = (listener: Listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const listContractors = async (): Promise<Contractor[]> => {
  return ensureSeedData().map(cloneContractor)
}

export const getContractorById = async (id: string): Promise<Contractor | null> => {
  const items = ensureSeedData()
  const found = items.find((item) => item.id === id)
  return found ? cloneContractor(found) : null
}

export const getContractorByEmail = async (email: string): Promise<Contractor | null> => {
  const normalizedEmail = email.trim().toLowerCase()
  const items = ensureSeedData()
  const found = items.find((item) => item.personalData.email.toLowerCase() === normalizedEmail)
  return found ? cloneContractor(found) : null
}

export const updateContractor = async (
  contractorId: string,
  updates: Partial<Contractor>,
): Promise<Contractor | null> => {
  const items = ensureSeedData()
  const index = items.findIndex((item) => item.id === contractorId)

  if (index === -1) {
    return null
  }

  const updated: Contractor = {
    ...items[index],
    ...updates,
    personalData: updates.personalData ?? items[index].personalData,
    documents: updates.documents ?? items[index].documents,
    paymentMethod: updates.paymentMethod ?? items[index].paymentMethod,
    completedSteps: updates.completedSteps ?? items[index].completedSteps,
    lastUpdatedAt: updates.lastUpdatedAt ?? new Date(),
  }

  items[index] = updated
  writeStorage(items)
  return cloneContractor(updated)
}
