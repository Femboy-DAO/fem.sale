import * as React from 'react'
import { useFemErecterConfig, StatusMessages } from '../hooks/fem-erecter';

type CountdownProps = {
  countDownDate: number;
  message: string;
  // secondaryMessage: string;
}

export const useCurrentTime = () => {
  const [time, setTime] = React.useState(Math.floor(Date.now() / 1000));
  React.useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => setTime(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(interval);
  });
  return time;
}

const CountdownTimer = ({countDownDate, message}: CountdownProps) => {
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => {
      if (!countDownDate) return;
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        clearInterval(interval)
        setText("");
        return
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setText(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  if (!text) return <></>

  return <>
    <h1>{message}</h1>
    <h5 className="countdown">{text}</h5>
  </>
}

export const SaleStatus = () => {
  const currentTime = useCurrentTime()

  const {
    saleStartTime,
    saleEndTime,
    spendDeadline,
    minimumEthRaised,
    ethRaised,
    saleState
  } = useFemErecterConfig();

  const EthRaised = () => <>
    {
      minimumEthRaised
        ? `${ethRaised.formatted} of minimum ${minimumEthRaised.formatted}`
        : ''
    }
  </>

  return (
    
    <div className='container-content'>
      {
        saleState === "PENDING" && <CountdownTimer countDownDate={saleStartTime * 1000} message="Coming soon uWu" />
      }
      {
        saleState === "ACTIVE" && <CountdownTimer countDownDate={saleEndTime * 1000} message="Ending soon uWu" />
      }
      {
        saleState === "FUNDS_PENDING" && <CountdownTimer countDownDate={spendDeadline * 1000} message="Spending soon? uWu" />
      }
      <p><b><span className='token'>ETH</span> Raised:</b> <EthRaised /></p>
      <p><b>Status:</b> {StatusMessages[saleState ?? "PENDING"]}</p>
    </div>
  )
}