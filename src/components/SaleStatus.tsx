import * as React from 'react'
import { useFemErecterConfig, StatusMessages } from '../hooks/fem-erecter';

export const SaleStatus = () => {
  const currentTime = Math.floor(Date.now() / 1000);
  const {
    saleStartTime,
    saleEndTime,
    spendDeadline,
    minimumEthRaised,
    ethRaised,
    saleState
  } = useFemErecterConfig();

  const StartsAt = () => <>
    {
      saleStartTime ?
        currentTime < saleStartTime
          ? `In ${((saleStartTime - currentTime) / 3600).toFixed(2)} Hours`
          : `Occurred at ${new Date(saleStartTime).toString()}`
      : ''
    }
  </>

  const EndsAt = () => <>
    {
      saleEndTime ?
        currentTime < saleEndTime
          ? `In ${((saleEndTime - currentTime) / 3600).toFixed(2)} Hours`
          : `Occurred at ${new Date(saleEndTime).toString()}`
      : ''
    }
  </>

  const DeadlineAt = () => <>
    {
      spendDeadline ?
        currentTime < spendDeadline
          ? `In ${((spendDeadline - currentTime) / 3600).toFixed(2)} Hours`
          : `Occurred at ${new Date(spendDeadline).toString()}`
      : ''
    }
  </>

  const EthRaised = () => <>
    {
      minimumEthRaised
        ? `${ethRaised.formatted} of minimum ${minimumEthRaised.formatted}`
        : ''
    }
  </>

  return (
    <div className='container-content'>
      <h1>Sale Info</h1>
      <p><b>Start:</b> <StartsAt /></p>
      <p><b>End:</b> <EndsAt /></p>
      <p><b>Spend Deadline:</b> <DeadlineAt /></p>
      <p><b>ETH Raised:</b> <EthRaised /></p>
      <p><b>Status:</b> {StatusMessages[saleState ?? "PENDING"]}</p>
    </div>
  )
}