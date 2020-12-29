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

export const swapFiatStableCoinToEth = async (web3ViaInfuraProvider: any, daiContract: any, walletAddress: string, uniswapV2Router02Contract: any): Promise<string> => {

  const availableDAIToSwap = await daiContract.methods.balanceOf(walletAddress).call()
  console.log(`I found ${availableDAIToSwap / 1000000000000000000} DAI in wallet ${walletAddress} - ready to swap`)

  const daiToken = new Token(ChainId.MAINNET, tokens.DAI.address, 18);

  const pair = await Fetcher.fetchPairData(daiToken, WETH[ChainId.MAINNET]);
  const route = new Route([pair], daiToken);

  const trade = new Trade(
    route,
    new TokenAmount(daiToken, availableDAIToSwap.toString()),
    TradeType.EXACT_INPUT
  );


  console.log('nextMidPrice')
  console.log(trade.nextMidPrice.toSignificant(6))

  const slippageTolerance = new Percent("50", "10000");
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
  const path = [tokens.DAI.address, WETH[ChainId.MAINNET].address]
  const deadline = Math.floor(Date.now() / 1000) + 60 * 2

  var BN = web3ViaInfuraProvider.utils.BN;

  console.log('till here things seem so cool :)')

  const tx = await uniswapV2Router02Contract.methods.swapExactTokensForETH(
    new BN(availableDAIToSwap),
    new BN(amountOutMin),
    path,
    walletAddress,
    deadline
  ).call()

  console.log(tx.hash)

  const receipt = await tx.wait()

  console.log(receipt)

  return Promise.resolve("")

};

