require("dotenv").config();

import { borrowFiatStableCoin } from "./utils/borrow-fiat-stable-coin";
import { depositCryptoMoneyToAave } from "./utils/deposit-crypto-money-to-aave";
import { ensureEnvironmentIsReasonablyConfigured } from "./utils/ensure-environment-reasonably-configured";
import { isAnInvestmentRoundReasonable } from "./utils/is-an-investment-round-reasonable";
import { swapDAIToETH } from "./utils/swap-fiat-stable-coin-to-eth";


ensureEnvironmentIsReasonablyConfigured();

setInterval(async () => {
  if (await isAnInvestmentRoundReasonable()) {
    await executeInvestmentRound();
  } else {
    console.log(
      "At the moment it does not make sense to trigger another investment round."
    );
  }
}, 1000 * 5);

async function executeInvestmentRound(): Promise<void> {
  await borrowFiatStableCoin();
  await swapDAIToETH();
  await depositCryptoMoneyToAave();
}

