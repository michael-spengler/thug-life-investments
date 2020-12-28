require('dotenv').config()
const { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } = require('@uniswap/sdk')

if (process.env.ACCOUNT === undefined || process.env.ACCOUNT.length < 10) {
    throw new Error(`Please copy the .env.example file to .env and add your data for the wallet you want to optimize.`)
} else {
    console.log(`optimizing crypto investments for wallet: ${process.env.ACCOUNT} on a regular basis`)
}

setInterval(async () => {
    
    if (await isAnotherInvestmentRoundReasonable()) {

        await borrowUSDollarStableCoin()
        await swapUSDollarStableCoinToCryptoMoney()
        await depositCryptoMoneyToAave()

    } else {

        console.log('At the moment it does not make sense to trigger another investment round.')

    }

}, 1000 * 5)



async function isAnotherInvestmentRoundReasonable() {
    console.log('checking if another investment round is economically reasonable')
    // if (transactionFeesForNextRound > 10 % of the transaction amount || health factor (see aave.com) < 1.14) {
    //     ... return false
    //   } else {
    //     ... return true
    //   }

    return Promise.resolve(true)
}

async function borrowUSDollarStableCoin() {
    console.log('borrowing US Dollar stable coin')
}

async function swapUSDollarStableCoinToCryptoMoney() {
    console.log('swapping USDollarStableCoin to ETH')

    const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

    console.log(pair)
    // const route = new Route([pair], WETH[DAI.chainId])

    // const amountIn = '1000000000000000000' // 1 WETH

    // const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)

}

async function depositCryptoMoneyToAave() {
    console.log('depositing crypto money to aave.com')
}