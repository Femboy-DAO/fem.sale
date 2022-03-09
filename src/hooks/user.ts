import { useBalance, useAccount } from 'wagmi'
import { Fem } from '../config';

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
  })
  return {
    amount: data?.value,
    formatted: data?.formatted
  }
}