// const ethers = require('ethers')
// require('dotenv').config()

// const ethereumBlockchainProvider = ethers.getDefaultProvider(
//     'mainnet',
//     {
//       etherscan: process.env.ETHERSCAN_API_KEY,
//       infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
//     })

//   const signer = new ethers.Wallet(process.env.PRIVATE_KEY)

//   const account = signer.connect(ethereumBlockchainProvider)

//   // https://uniswap.org/docs/v2/smart-contracts/router02/#swapexactethfortokens
//   const uniswap = new ethers.Contract(
//     '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
//     ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
//     account)

//     const init = async () => {
//         const estimatedGasPrice = await uniswap.estimateGas.swapExactETHForTokens(ethers.utils.parseUnits('0.01', 18), path, to, deadline)
//         console.log(estimatedGasPrice)
//     }


//     init()

// // var decimalPlaces = 18;

// // var spenglerAmount = ethers.utils.parseUnits('0.01', decimalPlaces);
// // console.log(spenglerAmount)
// // // BigNumber { _bn: <BN: 10f0cf064dd59200000> }

// // var geil = ethers.utils.formatUnits(spenglerAmount, decimalPlaces);
// // console.log(geil)
// // // '5000.0'