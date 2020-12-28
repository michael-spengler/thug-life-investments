require('dotenv').config()
const { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } = require('@uniswap/sdk')

if (process.env.ACCOUNT === undefined || process.env.ACCOUNT.length < 10) {
    throw new Error(`Please copy the .env.example file to .env and add your data for the wallet you want to optimize.`)
} else {
    console.log(`optimizing crypto investments for wallet: ${process.env.ACCOUNT} on a regular basis`)
}

setInterval(async () => {
    
    await checkIfAnotherRoundIsReasonable()
    await borrowUSDC()
    await swapDAIToETH()
    await depositETHToAave()

}, 1000 * 5)



async function checkIfAnotherRoundIsReasonable() {
    console.log('checking if another investment round is economically reasonable')
    // if (transactionFeesForNextRound > 10 % of the transaction amount || health factor (see aave.com) < 1.14) {
    //     sleep some minutes and check again
    //   } else {
    //     Repeat steps 3 - 6
    //   }
}

async function borrowUSDC() {
    console.log('borrowing')
}

async function swapDAIToETH() {
    console.log('swapping USDC to ETH')

    const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

    console.log(pair)
    // const route = new Route([pair], WETH[DAI.chainId])

    // const amountIn = '1000000000000000000' // 1 WETH

    // const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)


    

}

async function depositETHToAave() {
    console.log('deposit ETH to Aave')
}