import { useAccount, useBalance, useContractRead, useContractWrite } from 'wagmi'
import { formatEther } from 'ethers/lib/utils'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import {
  ScuffedFemboys,
  ScuffedFemboysAbi
} from '../config'
import { constants } from 'ethers'
import { useCallback, useMemo } from 'react'
import { useLastDefined } from './use-last-defined'

const ScuffedFemboysConfig = {
  addressOrName: ScuffedFemboys,
  contractInterface: ScuffedFemboysAbi
}

export const useMintStatus = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'mintStatus',
  )
  const mintStatus = useMemo(() => data ? data : undefined, [data]);
  return useLastDefined(mintStatus);
}

export const useAlreadyClaimed = (addressContainer:any) => {
  const address = addressContainer?.address ?? constants.AddressZero;
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'alreadyClaimed',
    { args: address },
  )
  const alreadyClaimed = useMemo(() => {/* console.log(data); */ return data ? data : undefined}, [data]);
  return useLastDefined(alreadyClaimed);
}

export const useMaxSupply = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'maxSupply',
  )
  const maxSupply = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(maxSupply);
}

export const useTotalSupply = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'totalSupply',
  )
  const totalSupply = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(totalSupply);
}

export const useMaxScuffies4Sale = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'maxScuffies4Sale',
  )
  const maxScuffies4Sale = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(maxScuffies4Sale);
}

export const useScuffiesSold = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'scuffiesSold',
  )
  const scuffiesSold = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(scuffiesSold);
}

export const useMaxScuffies4Claim = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'maxScuffies4Claim',
  )
  const maxScuffies4Claim = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(maxScuffies4Claim);
}

export const useScuffiesClaimed = () => {
  const [{data}] = useContractRead(
    ScuffedFemboysConfig,
    'scuffiesClaimed',
  )
  const scuffiesClaimed = useMemo(() => data ? data.toNumber() : undefined, [data]);
  return useLastDefined(scuffiesClaimed);
}

export const useBuy = () => {
  const [{ error, loading }, write] = useContractWrite(
    ScuffedFemboysConfig,
    'buy'
  )
  const send = useCallback((value: BigNumberish, valueCount: number) => {
    write({ overrides: { value }, args: [valueCount] })
  }, [write])
  return {
    error,
    loading,
    send
  }
}

export const useClaim = () => {
  const [{ error, loading }, write] = useContractWrite(
    ScuffedFemboysConfig,
    'claim'
  )
  const send = useCallback((merkleProof: string[]) => {
    write({ args: [merkleProof] })
  }, [write])
  return {
    error,
    loading,
    send
  }
}

/* export const useScuffedFemboysConfig = () => {
  const mintStatus = useMintStatus()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()
  return {
    mintStatus,
    maxSupply,
    totalSupply
  }
} */
