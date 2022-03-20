import * as React from 'react'
import { useAccount } from 'wagmi'
import { useDepositedAmount } from '../hooks/fem-erecter'
import { useEthBalance, useFemBalance } from '../hooks/user';

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })
  const ethBalance = useEthBalance()
  const ethDeposited = useDepositedAmount()
  const femBalance = useFemBalance()

  if (!accountData) return <div>No account connected</div>

  return (
    <div className='container-account-data'>
      <button className='button-disconnect' onClick={disconnect}>
        Disconnect from {accountData?.connector?.name}
      </button>

      <h3>User Info</h3>

{/*       <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div> */}

      {
        accountData && (
          <div className='account-data-funds'>
            <span className='account-data'><b><span className='token'>ETH</span> Balance:</b> {ethBalance.formatted}</span>
            <span className='account-data'><b><span className='token'>ETH</span> Deposited:</b> {ethDeposited.formatted}</span>
            <span className='account-data'><b><span className='token'>FEM</span> Balance:</b> {femBalance.formatted}</span>
          </div>
        )
      }

     {/*  {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )} */}
    </div>
  )
}