require("dotenv").config();

import { borrowFiatStableCoin } from "./utils/borrow-fiat-stable-coin";
import { depositCryptoMoneyToAave } from "./utils/deposit-crypto-money-to-aave";
import { ensureEnvironmentIsReasonablyConfigured } from "./utils/ensure-environment-reasonably-configured";
import { isAnInvestmentRoundReasonable } from "./utils/is-an-investment-round-reasonable";
import { swapFiatStableCoinToEth } from "./utils/swap-fiat-stable-coin-to-eth";
import { daiJSONInterface } from "./constants/dai-json-interface";
import { uniswapJSONInterface } from "./constants/uniswap-json-interface";
import tokens from "./constants/tokens.json";
import contracts from "./constants/contracts.json";

const Web3 = require('web3')

ensureEnvironmentIsReasonablyConfigured();

const web3ViaInfuraProvider = getwWeb3ViaInfuraProvider();
const daiContract = getDAIContract(web3ViaInfuraProvider)
const uniswapV2Router02Contract = getUniswapContract(web3ViaInfuraProvider)

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
  await swapFiatStableCoinToEth(web3ViaInfuraProvider, daiContract, process.env.ACCOUNT, uniswapV2Router02Contract);
  await depositCryptoMoneyToAave();
}

function getwWeb3ViaInfuraProvider(): any {

  const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`))

  return web3
}

function getDAIContract(provider: any) {
  var Contract = require('web3-eth-contract');

  Contract.setProvider(provider);

  var contract = new Contract(daiJSONInterface, tokens.DAI.address);

  return contract

}

function getUniswapContract(provider: any) {
  var Contract = require('web3-eth-contract');

  Contract.setProvider(provider);

  const uniswapContractAddress = contracts.uniswap.address

  var contract = new Contract(uniswapJSONInterface, uniswapContractAddress);

  return contract

}
