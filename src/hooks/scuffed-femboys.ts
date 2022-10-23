import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { formatEther, Result } from "ethers/lib/utils";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ScuffedFemboys, ScuffedFemboysAbi } from "../config";
import { constants } from "ethers";
import { useCallback, useMemo } from "react";
import { useLastDefined } from "./use-last-defined";

const ScuffedFemboysConfig = {
  addressOrName: ScuffedFemboys,
  contractInterface: ScuffedFemboysAbi,
};

const useLatestCallResult = (name: string, args?: any, toNumber?: boolean, watch?: boolean) => {
  const [{ data }] = useContractRead(ScuffedFemboysConfig, name, {
    watch: watch,
    args,
  });
  const lastDef = useLastDefined(data);
  return toNumber ? lastDef?.toNumber?.() ?? lastDef : lastDef;
};

export const useMintStatus = () => useLatestCallResult("mintStatus", null, false, true);

export const useAlreadyClaimed = () => {
  const [{ data: account }] = useAccount();
  const address = account?.address ?? constants.AddressZero;
  const data = useLatestCallResult("alreadyClaimed", address, false, true);
  return data;
};

export const useMaxSupply = () =>
  useLatestCallResult("maxSupply", undefined, true, false);

export const useTotalSupply = () =>
  useLatestCallResult("totalSupply", undefined, true, true);

export const useMaxScuffies4Sale = () =>
  useLatestCallResult("maxScuffies4Sale", undefined, true, false);

export const useScuffiesSold = () =>
  useLatestCallResult("scuffiesSold", undefined, true, true);

export const useMaxScuffies4Claim = () =>
  useLatestCallResult("maxScuffies4Claim", undefined, true, false);

export const useScuffiesClaimed = () =>
  useLatestCallResult("scuffiesClaimed", undefined, true, true);

export const useBuy = () => {
  const [{ error, loading }, write] = useContractWrite(
    ScuffedFemboysConfig,
    "buy"
  );
  const send = useCallback(
    (value: BigNumberish, valueCount: number) => {
      write({ overrides: { value }, args: [valueCount] });
    },
    [write]
  );
  return {
    error,
    loading,
    send,
  };
};

export const useClaim = () => {
  const [{ error, loading }, write] = useContractWrite(
    ScuffedFemboysConfig,
    "claim"
  );
  const send = useCallback(
    (merkleProof: string[]) => {
      console.log(merkleProof);
      const res = write({ args: [merkleProof] });
      res.then(r => console.log(r.error))
    },
    [write]
  );
  return {
    error,
    loading,
    send,
  };
};
