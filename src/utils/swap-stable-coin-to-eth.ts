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
import { ethers } from "ethers";
import tokens from "../constants/tokens.json";
import contracts from "../constants/contracts.json";

export const swapStableCoinToEth = async (
  stableCoinSymbol: "DAI" | "USDC",
  amount: number,
  wallet: ethers.Wallet
): Promise<string> => {
  const fixedAmount = ethers.utils.parseEther(amount.toString());

  const stableCoinToken = new Token(ChainId.MAINNET, tokens[stableCoinSymbol].address, 18);

  const pair = await Fetcher.fetchPairData(stableCoinToken, WETH[ChainId.MAINNET]);
  const route = new Route([pair], WETH[ChainId.MAINNET]);

  const trade = new Trade(
    route,
    new TokenAmount(WETH[ChainId.MAINNET], fixedAmount.toString()),
    TradeType.EXACT_INPUT
  );

  const slippageTolerance = new Percent("50", "10000");
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  // const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;

  const amountOutMinBigNumber = ethers.utils.parseUnits(
    amountOutMin.toSignificant(stableCoinToken.decimals).toString(),
    stableCoinToken.decimals
  );

  const inputAmountBigNumber = ethers.utils.parseEther(
    trade.inputAmount.toSignificant(18).toString()
  );

  const path = [stableCoinToken.address, WETH[ChainId.MAINNET].address];

  const deadline = Math.floor(Date.now() / 1000) + 60 * 2;

  const uniswapContract = new ethers.Contract(contracts.uniswap.address, [
    contracts.uniswap.functions.swapExactETHForTokens,
  ]);
  const uniswapContractWithSigner = uniswapContract.connect(wallet);

  const estimateGas = await uniswapContractWithSigner.estimateGas.swapExactETHForTokens(
    amountOutMinBigNumber.toHexString(),
    path,
    await wallet.getAddress(),
    deadline,
    {
      value: inputAmountBigNumber.toHexString(),
    }
  );

  
  const tx = await uniswapContractWithSigner.swapExactETHForTokens(
    amountOutMinBigNumber.toHexString(),
    path,
    await wallet.getAddress(),
    deadline,
    {
      gasPrice: await wallet.getGasPrice(),
      gasLimit: estimateGas.mul(ethers.BigNumber.from("2")),
      value: inputAmountBigNumber.toHexString(),
    }
  );

  console.log(tx.hash);

  const receipt = await tx.wait();
  console.log(receipt.blockNumber, tx.hash);
  return receipt;
};
