import * as React from 'react'
import { useAccount } from 'wagmi'
import { useDepositedAmount } from '../hooks/fem-erecter'
import { useEthBalance, useFemBalance } from '../hooks/user';

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const ethBalance = useEthBalance();
  const femBalance = useFemBalance();

  if (!accountData) return <div>No account connected</div>

  const toggleDetails = () => {
    document.body.classList.toggle('details-open')
  };

  return (
    <div className='container-account-data'>
      <div>
      <button className='button-disconnect' onClick={disconnect}>
        Disconnect from {accountData?.connector?.name}
      </button>

      <button className='toggle-details' onClick={toggleDetails}>Account details <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="black" />
      </svg></button>

      <div className='account-data-mobile'>
        <h4>User Info</h4>

        {
          accountData && (
            <div className='account-data-funds'>
              <span className='account-data'><b><span className='token'>ETH</span> Balance:</b> {ethBalance.formatted || "?"}</span>
              <span className='account-data'><b><span className='token'>FEM</span> Balance:</b> {femBalance.formatted || "?"}</span>
            </div>
          )
        }
      </div>
      </div>
      
    </div>
  )
}