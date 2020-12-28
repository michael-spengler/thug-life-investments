require("dotenv").config();
import { ethers } from "ethers";
import { ethToTokens } from "./utils/ethToTokens";

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
  if (await isAnotherInvestmentRoundReasonable()) {
    await borrowUSDollarStableCoin();
    await swapUSDollarStableCoinToCryptoMoney();
    await depositCryptoMoneyToAave();
  } else {
    console.log(
      "At the moment it does not make sense to trigger another investment round."
    );
  }
}, 1000 * 5);

async function isAnotherInvestmentRoundReasonable() {
  console.log(
    "checking if another investment round is economically reasonable"
  );
  // if (transactionFeesForNextRound > 10 % of the transaction amount || health factor (see aave.com) < 1.14) {
  //     ... return false
  //   } else {
  //     ... return true
  //   }

  return Promise.resolve(true);
}

async function borrowUSDollarStableCoin() {
  console.log("borrowing US Dollar stable coin");
}

async function swapUSDollarStableCoinToCryptoMoney() {
  console.log("swapping USDollarStableCoin to ETH");

  const receipt = await ethToTokens("USDC", 0.01, wallet);
  console.log('here we are')
  console.log(receipt);
}

async function depositCryptoMoneyToAave() {
  console.log("depositing crypto money to aave.com");
}
