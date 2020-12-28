require("dotenv").config();

import { ethers } from "ethers";
import { borrowFiatStableCoin } from "./utils/borrow-fiat-stable-coin";
import { depositCryptoMoneyToAave } from "./utils/deposit-crypto-money-to-aave";
import { isAnInvestmentRoundReasonable } from "./utils/is-an-investment-round-reasonable";
import { swapFiatStableCoinToEth } from "./utils/swap-fiat-stable-coin-to-eth";

if (process.env.ACCOUNT === undefined || process.env.ACCOUNT.length < 10) {
  throw new Error(
    `Please copy the .env.example file to .env and add your data for the wallet you want to optimize.`
  );
} else {
  console.log(
    `optimizing crypto investments for wallet: ${process.env.ACCOUNT} on a regular basis`
  );
}

const provider = new ethers.providers.InfuraProvider(
  "mainnet",
  process.env.INFURA_PROJECT_ID
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

setInterval(async () => {
  if (await isAnInvestmentRoundReasonable()) {
    await borrowFiatStableCoin();
    await swapFiatStableCoinToEth("DAI", 1, wallet);
    await depositCryptoMoneyToAave();
  } else {
    console.log(
      "At the moment it does not make sense to trigger another investment round."
    );
  }
}, 1000 * 5);

