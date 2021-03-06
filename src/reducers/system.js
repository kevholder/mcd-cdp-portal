import produce from 'immer';
import { DAI } from '../maker';
import { fromRad } from 'utils/units';

export const TOTAL_DEBT = 'totalDebt';
export const BASE_RATE = 'baseRate';
export const GLOBAL_DEBT_CEILING = 'globalDebtCeiling';
export const DEBT_AUCTION_LOT_SIZE = 'debtAuctionLotSize';
export const SURPLUS_AUCTION_LOT_SIZE = 'surplusAuctionLotSize';
export const NUMBER_OF_LIQUIDATIONS = 'numberOfLiquidations';
export const PAR = 'par';
export const SYSTEM_COLLATERALIZATION = 'systemCollateralization';
export const TOTAL_SAVINGS_DAI = 'totalSavingsDai';
export const TOTAL_CDPS = 'totalCdps';

export const initialState = {
  [BASE_RATE]: '0',
  [TOTAL_DEBT]: '0',
  [GLOBAL_DEBT_CEILING]: '0',
  [DEBT_AUCTION_LOT_SIZE]: '0',
  [NUMBER_OF_LIQUIDATIONS]: '0',
  [SURPLUS_AUCTION_LOT_SIZE]: '0',
  [PAR]: '0',
  [TOTAL_SAVINGS_DAI]: '0',
  [TOTAL_CDPS]: '0'
};

function convert(valueType, value) {
  switch (valueType) {
    case GLOBAL_DEBT_CEILING:
      return fromRad(value);
    case TOTAL_DEBT:
    case DEBT_AUCTION_LOT_SIZE:
    case SURPLUS_AUCTION_LOT_SIZE:
      return DAI.rad(value);
    case TOTAL_SAVINGS_DAI:
      return DAI.wei(value);
    default:
      return value;
  }
}

const reducer = produce((draft, { type, value }) => {
  if (!type) return;
  if (type === 'CLEAR_CONTRACT_STATE') return initialState;
  const [label, valueType] = type.split('.');
  if (label === 'system')
    if (value !== undefined) draft[valueType] = convert(valueType, value);
}, initialState);

export default reducer;
