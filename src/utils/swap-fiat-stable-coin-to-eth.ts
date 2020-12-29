import {
  ChainId,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from "@uniswap/sdk";
import tokens from "../constants/tokens.json";
import contracts from "../constants/contracts.json";

export const swapFiatStableCoinToEth = async (web3ViaInfuraProvider: any, daiContract: any, walletAddress: string): Promise<string> => {

  // const resultInWei = await web3ViaInfuraProvider.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c")
  // const resultInEther = await web3ViaInfuraProvider.utils.fromWei(resultInWei, "ether") + " ETH"

  const availableDAIToSwap = await daiContract.methods.balanceOf(walletAddress).call()
  console.log(`I found ${availableDAIToSwap / 1000000000000000000} DAI in wallet ${walletAddress}`)

  return Promise.resolve("")

};

