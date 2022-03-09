import * as React from 'react'
import { useAccount } from 'wagmi'
import { Account } from './Account'
import { Connect } from './Connect'

export const Navbar = () => {
  const [{ data: accountData }] = useAccount()

  return <div className='navbar'>
    { accountData?.address ? <Account /> : <Connect /> }
  </div>
}