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
  
  export const swapFiatStableCoinToEth = async (
    name: "DAI" | "USDC",
    amount: number,
    wallet: ethers.Wallet
  ): Promise<string> => {
    console.log('amount')
    console.log(amount)
    const fixedAmount = ethers.utils.parseUnits(amount.toString(), 18);

    console.log('fixedAmount')
    console.log(fixedAmount)
  
    const token = new Token(ChainId.MAINNET, tokens[name].address, 18);
  
    const pair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], token);
    const route = new Route([pair], token);
  
    console.log('here we go')
    const trade = new Trade(
      route,
      new TokenAmount(token, fixedAmount.toString()),
      TradeType.EXACT_INPUT
    );

    console.log('here we go 2')
  
    const slippageTolerance = new Percent("50", "10000");
    const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  
    console.log('here we go 3')

    const amountOutMinBigNumber = ethers.utils.parseEther(
      amountOutMin.toSignificant(18).toString()
    );
  
    console.log('here we go 4')

    const inputAmountBigNumber = ethers.utils.parseUnits(
      trade.inputAmount.toSignificant(token.decimals).toString(),
      token.decimals
    );
  
    console.log('here we go 5')
    const path = [token.address, WETH[ChainId.MAINNET].address];
    
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2;
    
    console.log('here we go 6')
  
    const tokenContract = new ethers.Contract(token.address, [
      contracts.uniswap.functions.approve,
    ]);

    console.log('here we go 7')
    const tokenContractWithSigner = tokenContract.connect(wallet);

    console.log('here we go 8')
    const txApprove = await tokenContractWithSigner.approve(
      contracts.uniswap.address,
      inputAmountBigNumber.toHexString()
    );

    console.log('here we go 9')
    await txApprove.wait();
    
    console.log('here we go 10')
    const uniswapContract = new ethers.Contract(
      contracts.uniswap.address,
      [contracts.uniswap.functions.swapExactTokensForETH],
      wallet.provider
    );

    console.log('here we go 11')
    const uniswapContractWithSigner = uniswapContract.connect(wallet);
  
    console.log('here we go 12')
    const estimateGas = await uniswapContractWithSigner.estimateGas.swapExactTokensForETH(
      inputAmountBigNumber.toHexString(),
      amountOutMinBigNumber.toHexString(),
      path,
      await wallet.getAddress(),
      deadline
    );
  
    console.log('here we go 13')
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
  
    console.log('here we go 14')
    console.log(tx.hash);
  
    const receipt = await tx.wait();

    console.log('here we go 15')
    console.log(receipt.blockNumber, tx.hash);

    
    return receipt;
  };
  