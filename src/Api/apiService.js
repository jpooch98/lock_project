import { apiClient } from "./apiClient";

export const retrieveAllLocksApi
    = () => apiClient.get(`/locks/allLocks`)

export const createLockApi
    = (lock) => apiClient.post(`/lock/create`, lock)

export const getLockApi
    = (id) => apiClient.get(`/getlock/${id}`)

export const getNumLocks
    = () => apiClient.get(`/lock/numLocks`)
