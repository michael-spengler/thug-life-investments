require("dotenv").config();

import { ethers } from "ethers";
import { borrowFiatStableCoin } from "./utils/borrow-fiat-stable-coin";
import { depositCryptoMoneyToAave } from "./utils/deposit-crypto-money-to-aave";
import { ensureEnvironmentIsReasonablyConfigured } from "./utils/ensure-environment-reasonably-configured";
import { isAnInvestmentRoundReasonable } from "./utils/is-an-investment-round-reasonable";
import { swapFiatStableCoinToEth } from "./utils/swap-fiat-stable-coin-to-eth";


ensureEnvironmentIsReasonablyConfigured()


const provider = getInfuraProvider()
const ethersWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


setInterval(async () => {
  if (await isAnInvestmentRoundReasonable()) {
    await executeInvestmentRound()
  } else {
    console.log(
      "At the moment it does not make sense to trigger another investment round."
    );
  }
}, 1000 * 5);


async function executeInvestmentRound(): Promise<void> {
  await borrowFiatStableCoin();
  await swapFiatStableCoinToEth("DAI", 1, ethersWallet);
  await depositCryptoMoneyToAave();
}


function getInfuraProvider() {
  return new ethers.providers.InfuraProvider(
    "mainnet",
    process.env.INFURA_PROJECT_ID
  );
}
