require("dotenv").config();

import { borrowFiatStableCoin } from "./utils/borrow-fiat-stable-coin-from-aave";
import { depositCryptoMoneyToCompound } from "./utils/deposit-crypto-money-to-compound";
import { ensureEnvironmentIsReasonablyConfigured } from "./utils/ensure-environment-is-reasonably-configured";
import { isAnInvestmentRoundReasonable } from "./utils/is-an-investment-round-reasonable";
import { swapDAIToETH } from "./utils/swap-fiat-stable-coin-to-eth";


ensureEnvironmentIsReasonablyConfigured();

setInterval(async () => {
  if (await isAnInvestmentRoundReasonable()) {
    console.log("starting an investmentround.");
    // await executeInvestmentRound();
  } else {
    console.log("At the moment it does not make sense to trigger another investment round.");
  }
}, 1000 * 5);

async function executeInvestmentRound(): Promise<void> {
  await borrowFiatStableCoin();
  await swapDAIToETH();
  await depositCryptoMoneyToCompound();
}

