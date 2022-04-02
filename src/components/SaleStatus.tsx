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

  var countDownDate = new Date("Apr 8, 2022 00:00:00").getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    let countDownTimer = document.getElementById("countdown")!

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countDownTimer.innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      countDownTimer.innerHTML = "Let the femboy takeover commence.";
    }
  }, 1000);

  return (
    
    <div className='container-content'>
      <h1>Coming soon uWu</h1>
      <h5 id="countdown"></h5>
      <p><b>Start:</b> <StartsAt /></p>
      <p><b>End:</b> <EndsAt /></p>
      <p><b>Spend Deadline:</b> <DeadlineAt /></p>
      <p><b><span className='token'>ETH</span> Raised:</b> <EthRaised /></p>
      <p><b>Status:</b> {StatusMessages[saleState ?? "PENDING"]}</p>
    </div>
  )
}