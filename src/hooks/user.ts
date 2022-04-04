import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { useBalance, useAccount } from 'wagmi'
import { Fem } from '../config';
import { useLastDefined } from './use-last-defined';

export const useEthBalance = () => {
  const [{ data: account },] = useAccount()
  const address = account?.address;
  const [{ data },] = useBalance({
    addressOrName: address || '',
    watch: true
  })
  return {
    amount: data?.value,
    formatted: data?.formatted
  }
}

export const useFemBalance = () => {
  const [{ data: account },] = useAccount()
  const address = account?.address;
  const [{ data },] = useBalance({
    addressOrName: address || '',
    token: Fem,
    watch: true
  });
  const returnValue = useLastDefined(data);

  return {
    amount: returnValue ? returnValue.value : undefined,
    formatted: returnValue?.formatted
  }
}