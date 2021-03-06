require("dotenv").config();

import {
  Fetcher,
  Percent,
  Route,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from "@uniswap/sdk";
import { ethers } from "ethers";
import { uniswapJSONInterface } from "../constants/uniswap-json-interface";
import { daiJSONInterface } from "../constants/dai-json-interface";

console.log('los gehts')

const daiTokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

export const swapDAIToETH = (async() => {
  const dai = (await Fetcher.fetchTokenData(1, daiTokenAddress))
  const pair = await Fetcher.fetchPairData(dai, WETH[1])
  const route = new Route([pair], dai)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY)
  const provider = ethers.getDefaultProvider('mainnet', {infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`})
  const account = signer.connect(provider)

  const daiSmartContract = new ethers.Contract('0x6B175474E89094C44Da98b954EedeAC495271d0F', daiJSONInterface, account)
  const balanceOfDaiOnAccount = await daiSmartContract.balanceOf(process.env.ACCOUNT)
  console.log(balanceOfDaiOnAccount)

  const trade = new Trade(route, new TokenAmount(dai, balanceOfDaiOnAccount), TradeType.EXACT_INPUT)
  console.log(route.midPrice.toSignificant(6))
  console.log(trade.executionPrice.toSignificant(6))

  const slippageTolerance = new Percent('50', '10000')
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw

  console.log(amountOutMin.toString())

  console.log(ethers.BigNumber.from("42"))

  const path = [daiTokenAddress, WETH[1].address]

  const deadline = Math.floor(Date.now() / 1000) + 60 * 2

  const uniswapSmartContract = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', uniswapJSONInterface, account)
  
  const tx = await uniswapSmartContract.swapExactTokensForETH(
    balanceOfDaiOnAccount,
    amountOutMin.toString(),
    path,
    process.env.ACCOUNT,
    deadline
  )

  console.log(tx.hash)
})

// swapDAIToETH() // will be called by index.ts in the overall scenario

