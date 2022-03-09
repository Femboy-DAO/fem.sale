import { DEFAULT_NETWORK } from './network'

const FemAddresses: Record<string, string> = {
  polygonMainnet: '0x0f539d2d606a88895020De69E6CE32669f7Adcb2'
}

const FemErecterAddresses: Record<string, string> = {
  polygonMainnet: '0x0e71c6F851C03d0a920097c66d704F6cAC0AAe66'
}

const GovernessAddresses: Record<string, string> = {
  polygonMainnet: '0xdEAd563D89986F0409d216C0F14Ebe4a00A223B1'
}

const GovernessActivatorAddresses: Record<string, string> = {
  polygonMainnet: '0xFf994Ed48952BC9221bEe1e278c1bCA39443CC7C'
}

const TimelockControllerAddresses: Record<string, string> = {
  polygonMainnet: '0xd61393A01B1327047dde3027DcEa0B33599d81Dd'
}

const DebugAddresses: Record<string, string> = {
  polygonMainnet: '0xC6aC8a9e11ecDe983D124892F7C0553a972B4444'
}

export const Fem = FemAddresses[DEFAULT_NETWORK]
export const FemErecter = FemErecterAddresses[DEFAULT_NETWORK]
export const Governess = GovernessAddresses[DEFAULT_NETWORK]
export const GovernessActivator = GovernessActivatorAddresses[DEFAULT_NETWORK]
export const TimelockController = TimelockControllerAddresses[DEFAULT_NETWORK]
export const Debug = DebugAddresses[DEFAULT_NETWORK]