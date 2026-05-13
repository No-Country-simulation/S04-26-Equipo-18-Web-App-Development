import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Contractor } from '@/shared/types'
import {
  listContractors,
  subscribeContractors,
  updateContractor as updateContractorInRepository,
} from '@/shared/data/contractorsRepository'

export const useContractorsData = () => {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const data = await listContractors()
    setContractors(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  useEffect(() => {
    return subscribeContractors(() => {
      void reload()
    })
  }, [reload])

  const findById = useCallback(
    (id?: string) => {
      if (!id) {
        return null
      }

      return contractors.find((contractor) => contractor.id === id) ?? null
    },
    [contractors],
  )

  const findByEmail = useCallback(
    (email?: string) => {
      if (!email) {
        return null
      }

      const normalizedEmail = email.trim().toLowerCase()
      return contractors.find((contractor) => contractor.personalData.email.toLowerCase() === normalizedEmail) ?? null
    },
    [contractors],
  )

  const updateContractor = useCallback(
    async (contractorId: string, updates: Partial<Contractor>) => {
      return updateContractorInRepository(contractorId, updates)
    },
    [],
  )

  return useMemo(
    () => ({
      contractors,
      isLoading,
      reload,
      findById,
      findByEmail,
      updateContractor,
    }),
    [contractors, findByEmail, findById, isLoading, reload, updateContractor],
  )
}
