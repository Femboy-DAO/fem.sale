import * as React from 'react'
import { parseEther } from 'ethers/lib/utils'
import { useMintStatus, useMaxSupply, useTotalSupply, useBuy, useClaim, useMaxScuffies4Sale, useScuffiesSold, useScuffiesClaimed, useMaxScuffies4Claim, useAlreadyClaimed } from '../hooks/scuffed-femboys'
import { useEthBalance, useAddress } from '../hooks/user';
import NP from 'number-precision'

export const ScuffedSale = () => {

  const userAddress = useAddress()
  const ethBalance = useEthBalance()

  const mintStatus = useMintStatus()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()
  const maxScuffies4Sale = useMaxScuffies4Sale();
  const scuffiesSold = useScuffiesSold();
  const maxScuffies4Claim = useMaxScuffies4Claim();
  const scuffiesClaimed = useScuffiesClaimed();
  const alreadyClaimed = useAlreadyClaimed(userAddress);

  const mintPrice = 0.05;
  const [mintCount, setMintCount] = React.useState(1);
  const claimCount = 2;

  function getBuyValue() {
    return NP.times(mintCount, mintPrice);
  }

  const buyCb = useBuy()
  const [disabledBuy, errorMessageBuy] = React.useMemo(() => {
    if (buyCb.error) console.log(buyCb.error.toString())
    if (!mintStatus || !maxScuffies4Sale || scuffiesSold == null) return [true, 'Loading...'] // undefined
    if (!userAddress.address) return [true, 'Please connect wallet']
    if (buyCb.loading) return [true, 'Transaction pending...']
    if ((+getBuyValue()) > +(ethBalance.formatted || '0')) return [true, 'Insufficient balance.']
    if (!mintStatus) return [true, "Mint has not started yet!"]
    if (scuffiesSold + mintCount <= maxScuffies4Sale) return [false, ""]
    return [true, 'They\'re all gone ;_;']
  }, [mintStatus, scuffiesSold, maxScuffies4Sale, ethBalance, userAddress, mintCount, buyCb.loading, buyCb.error, totalSupply, maxSupply])

  const claimCb = useClaim()
  const [disabledClaim, errorMessageClaim] = React.useMemo(() => {
    if (claimCb.error) console.log(claimCb.error.toString())
    if (!mintStatus || !maxScuffies4Claim || scuffiesClaimed == null) return [true, 'Loading...']
    if (!userAddress.address) return [true, 'Please connect wallet']
    if (claimCb.loading) return [true, 'Transaction pending...']
    
    if (!mintStatus) return [true, "Mint has not started yet!"]
    if (scuffiesClaimed + claimCount > maxScuffies4Claim) return [true, "They've all been claimed and something has gone terribly wrong"]
    // not on the list (not on list, store the list somewhere) -Later
    // Make sure this appears
    if (alreadyClaimed) return [true, "Already claimed!"]
    // On the list and haven't claimed -Later

    return [true, 'Unknown']
  }, [mintStatus, scuffiesClaimed, maxScuffies4Claim, ethBalance, claimCb.loading, claimCb.error, totalSupply, maxSupply])

  function mintCountInputVailidityCheck(val: string) {
    let parsedNum = mintCount;
    try {
      if (!val) {
        val = "1";
      }

      let parsedVal = Number.parseInt(val);

      if (parsedVal) {
        parsedNum = Math.max(1, Math.min(100, parsedVal));
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
          <p><span>Status: </span>{/* Please connect wallet / You're on the list! / You're not on the list :( / You already claimed! */}
            <span>{errorMessageClaim}</span>
          </p>
        </div>

        <div>

          <div className='gen-container center-insides'>
            <button className='gen-button' style={{ width: '100%' }}  disabled={disabledClaim}>
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
            <button className='gen-button' style={{ width: '20%' }} onClick={() => setMintCount(mintCount > 1 ? mintCount - 1 : mintCount)}>
              -
            </button>
            <input className='gen-input' style={{ width: '60%', textAlign: 'center' }} value={mintCount} onChange={(e) => setMintCount(mintCountInputVailidityCheck(e.target.value))} />
            <button className='gen-button' style={{ width: '20%' }} onClick={() => setMintCount(mintCount < 100 ? mintCount + 1 : mintCount)}>
              +
            </button>
          </div>

          <div className='gen-container center-insides'>
            <div>
            <button className='gen-button' style={{ width: '100%' }} onClick={() => buyCb.send(parseEther(getBuyValue().toString()), mintCount)} disabled={disabledBuy}>
              Mint! {" (" + getBuyValue() + " ETH)"}
            </button>
            {(mintCount >= 20) ? <span>Y-you really don't need so many ;_;</span> : (mintCount >= 10) ? <span>W-why are you minting so many? OwO</span> : (mintCount >= 5) ? <span>You need an entire har-uh, I mean, squad, huh? Understandable ^_^</span> : ""}
            </div>
            
          </div>

          {/*<button className='button-deposit' onClick={() => send(parseEther(value.toString()))} disabledBuy={disabledBuy || (+value) <= 0}>
              Mint
            </button> */}

        </div>
        {errorMessageBuy && <p className='error-message'>{errorMessageBuy}</p>}

      </div>
    </div>
  </div>
}