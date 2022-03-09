import { useAccount, useBalance, useContractRead, useContractWrite } from 'wagmi'
import { formatEther } from 'ethers/lib/utils'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import {
  Debug,
  DebugAbi,
  FemErecter,
  FemErecterAbi,
  DEBUG
} from '../config'
import { constants } from 'ethers'
import { useCallback } from 'react'


export const SaleStates = [
  'PENDING', // Sale has not started yet
  'ACTIVE', // Sale is active
  'FUNDS_PENDING', // Sale complete with more than minimum ETH raised, pending use by DAO
  'SUCCESS', // Sale complete with ETH claimed by DAO
  'FAILURE' // Sale complete with less than minimum ETH raised OR funds not used in time
] as const

export const StatusMessages = {
  'PENDING': 'Sale has not started yet.',
  'ACTIVE': 'Sale is active.',
  'FUNDS_PENDING': 'Sale complete, awaiting DAO decision to claim ETH.',
  'SUCCESS': 'Sale complete, ETH claimed by DAO.',
  'FAILURE': 'Sale failed.',
}

export type SaleState = typeof SaleStates[number]

const FemErecterConfig = {
  addressOrName: FemErecter,
  contractInterface: FemErecterAbi
}

export const useSaleStartTime = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'saleStartTime',
    { watch: DEBUG }
  )
  return data ? data.toNumber() : undefined
}

export const useSaleEndTime = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'saleEndTime',
    { watch: DEBUG }
  )
  return data ? data.toNumber() : undefined
}

export const useSaleDuration = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'saleDuration',
    { watch: DEBUG }
  )
  return data ? data.toNumber() : undefined
}

export const useSpendDeadline = (): number | undefined => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'spendDeadline',
    { watch: DEBUG }
  )
  return data ? data.toNumber() : undefined
}

export const useSaleState = (): SaleState | undefined => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'state',
    { watch: true }
  )
  const stateId = data ? +data : undefined
  return stateId !== undefined ? SaleStates[stateId] : undefined
}

export const useMinimumEthRaised = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'minimumEthRaised',
    { watch: DEBUG }
  )
  const minimumEthRaised = data ? (data as any) as BigNumber : undefined
  return {
    amount: minimumEthRaised,
    formatted: minimumEthRaised ? formatEther(minimumEthRaised) : undefined
  }
}

export const useDepositedAmount = () => {
  const [{ data: account },] = useAccount()
  const address = account?.address ?? constants.AddressZero;
  const [{data}] = useContractRead(
    FemErecterConfig,
    'depositedAmount',
    { args: address, watch: true },
  )
  const depositedAmount = data ? (data as any) as BigNumber : undefined
  return {
    amount: depositedAmount,
    formatted: depositedAmount ? formatEther(depositedAmount) : undefined
  }
}

export const useDeposit = () => {
  const [{ error, loading }, write] = useContractWrite(
    FemErecterConfig,
    'deposit'
  )
  const send = useCallback((value: BigNumberish) => {
    write({ overrides: { value } })
  }, [write])
  return {
    error,
    loading,
    send
  }
}

export const useBurnFem = () => {
  const [{ error, loading }, write] = useContractWrite(
    FemErecterConfig,
    'burnFem'
  )
  const send = useCallback((value: BigNumberish) => {
    write({ args: [value] })
  }, [write])
  return {
    error,
    loading,
    send
  }
}

export const useEthRaised = () => {
  const [{ data },] = useBalance({
    addressOrName: FemErecter,
    watch: true
  })
  return {
    amount: data?.value,
    formatted: data?.formatted
  }
}

export const useFemErecterConfig = () => {
  const saleStartTime = useSaleStartTime()
  const saleEndTime = useSaleEndTime()
  const spendDeadline = useSpendDeadline()
  const minimumEthRaised = useMinimumEthRaised()
  const ethRaised = useEthRaised()
  const saleState = useSaleState()
  return {
    saleStartTime,
    saleEndTime,
    spendDeadline,
    minimumEthRaised,
    ethRaised,
    saleState
  }
}

export const useDebugSetState = () => {
  const [, setStartTime] = useContractWrite({
    addressOrName: Debug,
    contractInterface: DebugAbi
  }, 'setState');
  return useCallback((_state: number) => setStartTime({ args: [_state] }), [setStartTime])
}