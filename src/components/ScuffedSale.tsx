import * as React from 'react'
import { parseEther } from 'ethers/lib/utils'
import { useDeposit, useSaleEndTime, useSaleStartTime } from '../hooks/fem-erecter'
import { useEthBalance } from '../hooks/user';
import NP from 'number-precision'

export const ScuffedSale = () => {

  const ethBalance = useEthBalance()
  const saleStartTime = useSaleStartTime()
  const saleEndTime = useSaleEndTime()
  const currentTime = Math.floor(Date.now() / 1000);
  const { loading, send } = useDeposit()
  const [value, setValue] = React.useState("0")
  const [disabled, errorMessage] = React.useMemo(() => {
    if ((+value) > +(ethBalance.formatted || '0')) return [true, 'Insufficient balance.']
    if (!saleEndTime || !saleStartTime) return [true, 'Loading...']
    if (loading) return [true, 'Transaction pending...']
    if (currentTime < saleStartTime) return [true, 'Sale has not started yet.']
    if (currentTime < saleEndTime) return [false, '']
    return [true, 'Sale has ended.']
  }, [saleEndTime, saleStartTime, ethBalance, value, currentTime, loading])
  // ^I don't know what all this means. Yet.

  const mintPrice = 0.05;
  const [mintCount, setMintCount] = React.useState(1);


  function mintCountInputVailidityCheck(val:string) {
    let parsedNum = mintCount;
    console.log(val);
    try {
      if(!val) {
        val = "1";
      }

      let parsedVal = Number.parseInt(val);

      if(parsedVal) {
        parsedNum = Math.max(1,Math.min(100,parsedVal));
      }
    } catch (error) {
    }
    return parsedNum;
  }

  return <div className="gen-container center-insides ">
    <div className="gen-container padded center-insides bubbly alt-color-2 squish">
      <div>
        <div>
          <h2>Claim</h2>
          <p>If you're on the claim list, you can claim 2 Scuffed Femboys for free!</p>
          <p>Status: Please connect wallet / You're on the list! / You're not on the list :( / You already claimed!</p> 
        </div>

        <div>

          <div className='gen-container center-insides'>
            <button className='gen-button' style={{width:'100%'}} onClick={() => send(parseEther(value.toString()))} disabled={disabled || (+value) <= 0}>
              Claim!
            </button>
          </div>

        </div>

        <hr />

        <div>
          <h2>Mint</h2>
          <p>1 Scuffed Femboy costs 0.05 <span className="token">ETH</span> </p>
        </div>

        <div>

          <div className='gen-container center-insides'>
            <button className='gen-button' style={{width:'20%'}} onClick={() => setMintCount(mintCount > 1 ? mintCount - 1 : mintCount)}>
              -
            </button>
            <input className='gen-input' style={{width:'60%', textAlign: 'center'}} value={mintCount} onChange={(e) => setMintCount(mintCountInputVailidityCheck(e.target.value))} />
            <button className='gen-button' style={{width:'20%'}} onClick={() => setMintCount(mintCount < 100 ? mintCount + 1 : mintCount)}>
              +
            </button>
          </div>

          <div className='gen-container center-insides tall'>
            <button className='gen-button' style={{width:'100%'}} onClick={() => send(parseEther(value.toString()))} disabled={disabled || (+value) <= 0}>
              Mint! { " (" + NP.times(mintCount,mintPrice) + " ETH)"}
            </button>
            {(mintCount>=20)?<span>Y-you really don't need so many ;_;</span>:(mintCount>=10)?<span>W-why are you minting so many? OwO</span>:(mintCount>=5)?<span>You need an entire har-uh, I mean, squad, huh? Understandable ^_^</span>:""}
          </div>

         {/*<button className='button-deposit' onClick={() => send(parseEther(value.toString()))} disabled={disabled || (+value) <= 0}>
              Mint
            </button> */}

        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

      </div>
    </div>
  </div>
}