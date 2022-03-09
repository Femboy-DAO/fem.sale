import * as React from 'react'
import { parseEther } from 'ethers/lib/utils'
import { useDeposit, useSaleEndTime, useSaleStartTime } from '../hooks/fem-erecter'
import { useEthBalance } from '../hooks/user';

export const Deposit = () => {
  const ethBalance = useEthBalance()
  const saleStartTime = useSaleStartTime()
  const saleEndTime = useSaleEndTime()
  const currentTime = Math.floor(Date.now() / 1000);
  const { loading, send } = useDeposit()
  const [value, setValue] = React.useState(0)
  const [disabled, errorMessage] = React.useMemo(() => {
    if (value > +(ethBalance.formatted || '0')) return [true, 'Insufficient balance.']
    if (!saleEndTime || !saleStartTime) return [true, 'Loading...']
    if (loading) return [true, 'Transaction pending...']
    if (currentTime < saleStartTime) return [true, 'Sale has not started yet.']
    if (currentTime < saleEndTime) return [false, '']
    return [true, 'Sale has ended.']
  }, [saleEndTime, saleStartTime, ethBalance, value, currentTime, loading])
  return <div>
    <h3>Deposit</h3>
    Deposit ETH to mint new FEM at a rate of 1:1.
    <br/>
    <label><b>ETH Amount</b></label> {'  '}
    <input value={value} disabled={disabled} onChange={(e) => setValue(+e.target.value)} />
    <button onClick={() => send(parseEther(value.toString()))} disabled={disabled || value <= 0}>
      Deposit
    </button>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  </div>
}