import { DEFAULT_NETWORK } from './network'

const FemAddresses: Record<string, string> = {
  polygonMainnet: '0x0f539d2d606a88895020De69E6CE32669f7Adcb2',
  mainnet: '0xf344b01da08b142d2466dae9e47e333f22e64588'
}

const FemErecterAddresses: Record<string, string> = {
  polygonMainnet: '0x0e71c6F851C03d0a920097c66d704F6cAC0AAe66',
  mainnet: '0x914a4bC879567fEcde2dC81F495a5d8d68187671'
}

const GovernessAddresses: Record<string, string> = {
  polygonMainnet: '0xdEAd563D89986F0409d216C0F14Ebe4a00A223B1',
  mainnet: '0x710C7E422A98963d6BA216840b1d83E77064A031'
}

const GovernessActivatorAddresses: Record<string, string> = {
  polygonMainnet: '0xFf994Ed48952BC9221bEe1e278c1bCA39443CC7C',
  mainnet: '0x6723659425DfdF94caf6345fA269855066FB57f0'
}

const ScuffedFemboysAddresses: Record<string, string> = {
  polygonMainnet: '0x4d43d56fF8733B20B053CF2F42DF3bc7cB1657Eb',
  mainnet: '0x6A4912083e8e7B6508D0568EB3eB40A8E681E121'
}

const TimelockControllerAddresses: Record<string, string> = {
  polygonMainnet: '0xd61393A01B1327047dde3027DcEa0B33599d81Dd',
  mainnet: '0xf78A448E464a1fEB693D76c9211D2d03ae488206'
}

const DebugAddresses: Record<string, string> = {
  polygonMainnet: '0xC6aC8a9e11ecDe983D124892F7C0553a972B4444',
  mainnet: '0xC6aC8a9e11ecDe983D124892F7C0553a972B4444'
}

export const Fem = FemAddresses[DEFAULT_NETWORK]
export const FemErecter = FemErecterAddresses[DEFAULT_NETWORK]
export const Governess = GovernessAddresses[DEFAULT_NETWORK]
export const GovernessActivator = GovernessActivatorAddresses[DEFAULT_NETWORK]
export const ScuffedFemboys = ScuffedFemboysAddresses[DEFAULT_NETWORK]
export const TimelockController = TimelockControllerAddresses[DEFAULT_NETWORK]
export const Debug = DebugAddresses[DEFAULT_NETWORK]