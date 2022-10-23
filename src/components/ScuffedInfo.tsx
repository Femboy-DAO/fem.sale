import * as React from 'react'
import { useMintStatus, useMaxSupply, useTotalSupply } from '../hooks/scuffed-femboys'
import { useEthBalance } from '../hooks/user';

export const ScuffedInfo = () => {

  const ethBalance = useEthBalance()
  const mintStatus = useMintStatus()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()

  const [infoMessage] = React.useMemo(() => {
    //console.log(mintStatus, totalSupply, maxSupply);
    if(maxSupply) {
      if (!mintStatus) return ["Mint soon!!! OwO"]
      if (totalSupply == maxSupply) return ["They're all gone ;_;"]
      return ["Minting live! (" + (totalSupply || "0") + "/" + maxSupply + ")"]
    }
    else return ["Loading..."];
  }, [mintStatus, maxSupply, totalSupply, ethBalance])

  return <div>
    <div className="gen-container center-insides lightly-padded center-text">
      <h3>
        {infoMessage}
      </h3>
    </div>
  </div>
}