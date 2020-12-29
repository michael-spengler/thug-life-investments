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

export const swapFiatStableCoinToEth = async (web3ViaInfuraProvider: any, daiContract: any, walletAddress: string, uniswapV2Router02Contract: any): Promise<string> => {

  // const resultInWei = await web3ViaInfuraProvider.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c")
  // const resultInEther = await web3ViaInfuraProvider.utils.fromWei(resultInWei, "ether") + " ETH"

  const availableDAIToSwap = await daiContract.methods.balanceOf(walletAddress).call()
  console.log(`I found ${availableDAIToSwap / 1000000000000000000} DAI in wallet ${walletAddress}`)
  const daiToken = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);

  
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
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
  console.log(`geil: ${amountOutMin}`)
  const path = ['0x6B175474E89094C44Da98b954EedeAC495271d0F', WETH[ChainId.MAINNET].address]
  const deadline = Math.floor(Date.now() / 1000) + 60 * 2
  console.log('here we go 3')

  
  console.log(await uniswapV2Router02Contract.methods.swapExactTokensForETH(
    // web3ViaInfuraProvider.utils.toBN(availableDAIToSwap),
    availableDAIToSwap,
    availableDAIToSwap,
    path,
    walletAddress,
    deadline
  ).call())



  return Promise.resolve("")

};

