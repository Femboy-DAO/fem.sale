import { useBurnFem, useSaleState } from "../hooks/fem-erecter"
import { useFemBalance } from "../hooks/user"

export const Withdraw = () => {
  const femBalance = useFemBalance()
  const saleState = useSaleState()
  const { loading, send } = useBurnFem()

  if (saleState !== "FAILURE") return <></>;

  return <div>
    <h3>Withdraw</h3>

    The sale has failed. FEM can now be burned for ETH at a rate of 1:1.
    <br/>
    {
      +(femBalance.formatted || '0') > 0 &&
      <button disabled={loading} onClick={() => femBalance?.amount ? send(femBalance.amount) : "0"}>Burn {femBalance?.formatted} ETH</button>
    }
    <br/>
    { loading && "Loading..." }
  </div>
}