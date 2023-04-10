import * as React from 'react'
import { parseEther } from 'ethers/lib/utils'
import { useMintStatus, useMaxSupply, useTotalSupply, useBuy, useClaim, useMaxScuffies4Sale, useScuffiesSold, useScuffiesClaimed, useMaxScuffies4Claim, useAlreadyClaimed } from '../hooks/scuffed-femboys'
import { useEthBalance, useAddress } from '../hooks/user';
import NP from 'number-precision'
import claimMerkleProofs from '../claimMerkleProofs.json';

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
  const alreadyClaimed = useAlreadyClaimed();

  React.useMemo(() => {
    console.log(`MINT STATUS ${mintStatus}`)
  }, [mintStatus])

  const mintPrice = 0.04;
  const [mintCount, setMintCount] = React.useState(1);
  const claimCount = 2;

  const getBuyValue = React.useCallback(() => {
    return NP.times(mintCount, mintPrice);
  }, [mintCount, mintPrice])

  interface addressProofBook {
    [key: string]: string[];
  } 

  let claimMerkleProofsAddress : addressProofBook = claimMerkleProofs.address;

  const getMerkleProofsByAddress = React.useCallback((addy:string) => {
    return claimMerkleProofsAddress[addy.toLowerCase()];
  }, [claimMerkleProofsAddress])

  const getMerkleProofsByAddressExist = React.useCallback((addy:string) => {
    return claimMerkleProofsAddress.hasOwnProperty(addy.toLowerCase());
  }, [claimMerkleProofsAddress])

  const buyCb = useBuy()
  const [disabledBuy, errorMessageBuy] = React.useMemo(() => {
    //if (buyCb.error) console.log(buyCb.error.toString())
    if (mintStatus === undefined || maxScuffies4Sale === undefined || scuffiesSold === undefined) return [true, "Loading..."];
    if (!userAddress.address) return [true, 'Please connect wallet']
    if (buyCb.loading) return [true, 'Transaction pending...']
    if ((+getBuyValue()) > +(ethBalance.formatted || '0')) return [true, 'Insufficient balance.']
    if (!mintStatus) return [true, "Mint has not started yet!"]
    if (scuffiesSold >= maxScuffies4Sale) return [true, "They\'re all gone ;_;"]
    if (scuffiesSold + mintCount > maxScuffies4Sale) return [true, "You can't buy more than there are left"]
    if (scuffiesSold + mintCount <= maxScuffies4Sale) return [false, ""]
    return [true, 'They\'re all gone ;_;']
  }, [mintStatus, scuffiesSold, maxScuffies4Sale, getBuyValue, ethBalance, userAddress, mintCount, buyCb.loading])

  const claimCb = useClaim()
  const [disabledClaim, errorMessageClaim] = React.useMemo(() => {
    //if (claimCb.error) console.log(claimCb.error.toString())
    if (mintStatus === undefined || maxScuffies4Claim === undefined || scuffiesClaimed === undefined) return [true, "Loading..."];
    if (!userAddress.address) return [true, 'Please connect wallet']
    if (claimCb.loading) return [true, 'Transaction pending...']

    if (!mintStatus) return [true, "Mint has not started yet!"]
    if (scuffiesClaimed + claimCount > maxScuffies4Claim) return [true, 'They\'ve all been claimed and something has gone terribly wrong']
    // not on the list (not on list, store the list somewhere)
    if (!getMerkleProofsByAddressExist(userAddress.address)) return [true, 'Not on the list :<']
    // Make sure this appears 
    if (alreadyClaimed) return [true, "Already claimed!"]
    // On the list and haven't claimed
    if (getMerkleProofsByAddressExist(userAddress.address)) return [false, 'You\'re on the list! :D']

    return [true, 'Unknown']
  }, [mintStatus, scuffiesClaimed, maxScuffies4Claim, userAddress, alreadyClaimed, getMerkleProofsByAddressExist, claimCb.loading])

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

  return <div className="gen-container center-insides padded">
    <div className="gen-container padded center-insides bubbly alt-color-2 squish">
      <div>
        <div className="gen-container lightly-padded">
          <div>

          <h2>Claim</h2>
          <p>If you're on the claim list, you can claim 2 Scuffed Femboys for free!</p>
          <p><span>Status: </span>{/* Please connect wallet / You're on the list! / You're not on the list :( / You already claimed! */}
            <span>{errorMessageClaim}</span>
          </p>

          </div>

        </div>

        <div>

          <div className='gen-container center-insides'>
            <button className={'gen-button ' + (disabledClaim ? 'disabled' : '')} style={{ width: '100%' }} onClick={() => claimCb.send(getMerkleProofsByAddress(userAddress.address || ''))} disabled={disabledClaim}>
              Claim!
            </button>
          </div>

        </div>


        <hr />

        <div className="gen-container lightly-padded">
          <div>
        <div>
          <h2>Mint</h2>
          <p>1 Scuffed Femboy costs 0.04 <span className="token">ETH</span></p>
        </div>

        </div></div>
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

          <div className='gen-container center-insides center-text'>
            {(mintCount >= 20) ? <span>Y-you really don't need so many ;_;</span> : (mintCount >= 10) ? <span>W-why are you minting so many? OwO</span> : (mintCount >= 5) ? <span>You need an entire har-uh, I mean, squad, huh? Understandable ^_^</span> : ""}
          </div>

          <div className='gen-container center-insides'>
            <button  className={'gen-button ' + (disabledBuy ? 'disabled' : '')} style={{ width: '100%' }} onClick={() => buyCb.send(parseEther(getBuyValue().toString()), mintCount)} disabled={disabledBuy}>
              Mint! {" (" + getBuyValue() + " ETH)"}
            </button>
          </div>
          
          
          <div className='gen-container center-insides center-text'>
          {errorMessageBuy && <span>{errorMessageBuy}</span>}
          </div>


        </div>

        {/* 
        {errorMessageBuy && <p className='error-message'>{errorMessageBuy}</p>}
 */}

      </div>
      
    </div>
    
  </div>
  
}