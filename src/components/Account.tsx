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
    <div>
      <h3>User Info</h3>

      <button onClick={disconnect}>
        Disconnect from {accountData?.connector?.name}
      </button>
      <br />

{/*       <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div> */}

      {
        accountData && (
          <div>
            <b>ETH Balance:</b> {ethBalance.formatted} <br/>
            <b>ETH Deposited:</b> {ethDeposited.formatted} <br/>
            <b>FEM Balance:</b> {femBalance.formatted} <br/>
          </div>
        )
      }

     {/*  {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )} */}
    </div>
  )
}