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
    <div>
      <h3>Sale Info</h3>
      <b>Start:</b> <StartsAt /> <br/>
      <b>End:</b> <EndsAt /> <br/>
      <b>Spend Deadline:</b> <DeadlineAt /> <br/>
      <b>ETH Raised:</b> <EthRaised /> <br/>
      <b>Status:</b> {StatusMessages[saleState ?? "PENDING"]}
    </div>
  )
}