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
import { useCallback, useMemo } from 'react'
import { useLastDefined } from './use-last-defined'


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
  )
  const startTime = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(startTime);
}

export const useSaleEndTime = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'saleEndTime',
  )
  const endTime = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(endTime)
  // returnendTimeata.toNumber() : undefined
}

export const useSaleDuration = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'saleDuration',
  )
  const saleDuration = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(saleDuration);
}

export const useSpendDeadline = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'spendDeadline',
  )
  const spendDeadline = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(spendDeadline)
}

export const useSaleState = (): SaleState | undefined => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'state',
    { watch: true }
  )
  const state = useMemo(() => data ? SaleStates[+data] : undefined, [data])
  return useLastDefined(state)
}

export const useMinimumEthRaised = () => {
  const [{data}] = useContractRead(
    FemErecterConfig,
    'minimumEthRaised',
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
  const returnValue = useLastDefined(data);
  return {
    amount: returnValue ? BigNumber.from(returnValue) : undefined,
    formatted: returnValue ? formatEther(returnValue) : "0.0"
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