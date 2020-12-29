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

export const tokensToEth = async (
  name: "DAI" | "USDC",
  amount: number,
  wallet: ethers.Wallet
): Promise<string> => {
  const fixedAmount = ethers.utils.parseUnits(amount.toString(), 18);

  const token = new Token(ChainId.MAINNET, tokens[name].address, 18);

  const pair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], token);
  const route = new Route([pair], token);

  const trade = new Trade(
    route,
    new TokenAmount(token, fixedAmount.toString()),
    TradeType.EXACT_INPUT
  );

  const slippageTolerance = new Percent("50", "10000");
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);

  const amountOutMinBigNumber = ethers.utils.parseEther(
    amountOutMin.toSignificant(18).toString()
  );

  const inputAmountBigNumber = ethers.utils.parseUnits(
    trade.inputAmount.toSignificant(token.decimals).toString(),
    token.decimals
  );

  const path = [token.address, WETH[ChainId.MAINNET].address];

  const deadline = Math.floor(Date.now() / 1000) + 60 * 2;

  const tokenContract = new ethers.Contract(token.address, [
    contracts.uniswap.functions.approve,
  ]);
  const tokenContractWithSigner = tokenContract.connect(wallet);
  const txApprove = await tokenContractWithSigner.approve(
    contracts.uniswap.address,
    inputAmountBigNumber.toHexString()
  );
  await txApprove.wait();

  const uniswapContract = new ethers.Contract(
    contracts.uniswap.address,
    [contracts.uniswap.functions.swapExactTokensForETH],
    wallet.provider
  );
  const uniswapContractWithSigner = uniswapContract.connect(wallet);

  const estimateGas = await uniswapContractWithSigner.estimateGas.swapExactTokensForETH(
    inputAmountBigNumber.toHexString(),
    amountOutMinBigNumber.toHexString(),
    path,
    await wallet.getAddress(),
    deadline
  );

  const tx = await uniswapContractWithSigner.swapExactTokensForETH(
    inputAmountBigNumber.toHexString(),
    amountOutMinBigNumber.toHexString(),
    path,
    await wallet.getAddress(),
    deadline,
    {
      gasPrice: await wallet.getGasPrice(),
      gasLimit: estimateGas.mul(ethers.BigNumber.from("2")),
    }
  );

  console.log(tx.hash);

  const receipt = await tx.wait();
  console.log(receipt.blockNumber, tx.hash);
  return receipt;
};
