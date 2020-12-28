

// require('dotenv').config()

// const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent, ETH } = require('@uniswap/sdk')
// const ethers = require('ethers')
// const chainId = ChainId.MAINNET

// const init = async () => {

//   // swapEtherToDAI()
//   await swapEtherToBAT()

// }

// async function swapEtherToBAT() {

//   const wrappedEtherOnMainnet = WETH[chainId]
//   const targetTokenContractAddress = '0x0d8775f648430679a709e98d2b0cb6250d2887ef' // BAT
//     // const targetTokenContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI

//   const targetToken = await Fetcher.fetchTokenData(chainId, targetTokenContractAddress)
//   console.log(targetToken)
//   const pair = await Fetcher.fetchPairData(targetToken, wrappedEtherOnMainnet)
//   console.log(pair)
//   const route = new Route([pair], wrappedEtherOnMainnet)
//   const trade = new Trade(route, new TokenAmount(wrappedEtherOnMainnet, '10000000000000'), TradeType.EXACT_INPUT)

//   console.log(`midPrice: ${route.midPrice.toSignificant(6)}`)
//   console.log(`invert: ${route.midPrice.invert().toSignificant(6)}`)

//   const slippageTolerance = new Percent('1', '100')
//   const amountOutIn = trade.minimumAmountOut(slippageTolerance).raw
//   const path = [wrappedEtherOnMainnet.address, targetToken.address]
//   const to = process.env.ACCOUNT
//   const deadline = Math.floor(Date.now() / 1000) + (60 * 2) // 2 minutes 
//   const value = trade.inputAmount.raw

//   console.log(`amountOutIn: ${amountOutIn}`)
//   console.log(`value: ${value}`)

//   const ethereumBlockchainProvider = ethers.getDefaultProvider(
//     'mainnet',
//     {
//       // etherscan: process.env.ETHERSCAN_API_KEY,
//       infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
//     })

//   const signer = new ethers.Wallet(process.env.PRIVATE_KEY)

//   const account = signer.connect(ethereumBlockchainProvider)

//   // https://uniswap.org/docs/v2/smart-contracts/router02/#swapexactethfortokens
//   const uniswap = new ethers.Contract(
//     '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
//     ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
//     account)

//   const estimatedGasPrice = await uniswap.estimateGas.swapExactETHForTokens(ethers.utils.parseUnits('1', 18), path, to, deadline)
//   console.log(estimatedGasPrice)

//   // const transaction = await uniswap.swapExactETHForTokens(ethers.utils.parseUnits('0.01', 18), path, to, deadline, {value: ethers.utils.parseUnits('0.001', 18)})

//   // console.log(`Transaction hash: ${transaction.hash}`)

//   // const receipt = await transaction.wait()

//   // console.log(`Transaction has been mined in block number: ${receipt.blockNumber}`)

// }



// async function swapEtherToDAI() {

//   // const targetToken = '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI

//   const token = await Fetcher.fetchTokenData(chainId, targetToken)
//   console.log(token)
//   const weth = WETH[chainId]
//   const pair = await Fetcher.fetchPairData(token, weth)
//   console.log(pair)
//   const route = new Route([pair], weth)
//   const trade = new Trade(route, new TokenAmount(weth, '1000000000000000'), TradeType.EXACT_INPUT)

//   console.log(`midPrice: ${route.midPrice.toSignificant(6)}`)
//   console.log(`invert: ${route.midPrice.invert().toSignificant(6)}`)
//   // console.log(`executionPrice: ${route.executionPrice.toSignificant(6)}`)
//   // console.log(`nextMidPrice: ${route.nextMidPrice.toSignificant(6)}`)

//   const slippageTolerance = new Percent('50', '10000')
//   const amountOutIn = trade.minimumAmountOut(slippageTolerance).raw
//   const path = [weth.address, token.address]
//   const to = ''
//   const deadline = Math.floor(Date.now() / 1000) + (60 * 2) // 2 minutes 
//   const value = trade.inputAmount.raw

//   console.log(`amountOutIn: ${amountOutIn}`)
//   console.log(`value: ${value}`)

//   const ethereumBlockchainProvider = ethers.getDefaultProvider(
//     'mainnet',
//     {
//       etherscan: process.env.ETHERSCAN_API_KEY,
//       infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
//     })

//   const signer = new ethers.Wallet(process.env.PRIVATE_KEY)

//   const account = signer.connect(ethereumBlockchainProvider)

//   // // https://uniswap.org/docs/v2/smart-contracts/router02/#swapexactethfortokens
//   // const uniswap = new ethers.Contract(
//   //   '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
//   //   ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);'],
//   //   account)

//   //   const transaction = uniswap.sendExactETHForTokens(amountOutIn, path, to, deadline, {value, gasPrice: 20e9})

//   //   console.log(`Transaction hash: ${tx.hash}`)

//   //   const receipt = await tx.wait()

//   //   console.log(`Transaction has been mined in block number: ${receipt.blockNumber}`)
// }
// init()