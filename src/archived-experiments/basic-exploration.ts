// https://ethereum.stackexchange.com/questions/84668/swap-tokens-back-to-ether-on-uniswap-v2-router-02-sell-tokens
// https://github.com/Uniswap/uniswap-sdk/blob/v2/test/router.test.ts
// https://medium.com/remix-ide/low-level-interactions-on-remix-ide-5f79b05ac86
// https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol#L310
// https://soliditydeveloper.com/uniswap2
// https://ethereum.stackexchange.com/questions/84668/swap-tokens-back-to-ether-on-uniswap-v2-router-02-sell-tokens
// https://vomtom.at/how-to-use-uniswap-v2-as-a-developer/
// https://etherscan.io/address/0x7a250d5630b4cf539739df2c5dacb4c659f2488d

import { ChainId, WETH } from "@uniswap/sdk";
import { daiJSONInterface } from "../constants/dai-json-interface";
import { uniswapJSONInterface } from "../constants/uniswap-json-interface";

require("dotenv").config();

const Web3 = require('web3')
const Contract = require('web3-eth-contract');
const web3ViaInfuraProvider = getwWeb3ViaInfuraProvider()


const uniswapContractAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const uniswapV2Router02Contract = getContract(web3ViaInfuraProvider, uniswapContractAddress, uniswapJSONInterface)

const daiContractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const daiContract = getContract(web3ViaInfuraProvider, daiContractAddress, daiJSONInterface)

const BIG_NUMBER = web3ViaInfuraProvider.utils.BN;

const showHowOneCanSwapAllDAIOnAccountToEther = async (web3ViaInfuraProvider: any) => {

    const pathMeaningFromAddressToAddress = [daiContractAddress, WETH[ChainId.MAINNET].address] // unsure about WETH Address
    console.log(pathMeaningFromAddressToAddress)

    const balanceOfDaiOnAccount = (await daiContract.methods.balanceOf(process.env.ACCOUNT).call())
    // const inputAmount = web3ViaInfuraProvider.utils.fromWei(balanceOfDaiOnAccount)
    const amountsOut = await uniswapV2Router02Contract.methods.getAmountsOut(balanceOfDaiOnAccount, pathMeaningFromAddressToAddress).call()

    const inputAmount = web3ViaInfuraProvider.utils.fromWei(balanceOfDaiOnAccount.toString())
    const OutputAmount = web3ViaInfuraProvider.utils.fromWei(amountsOut.toString().split(',')[1])
    console.log(`\n\nFor ${inputAmount} DAI, you would currently get about ${OutputAmount} Ether.\n\n`)


    // Approve Transaction = https://etherscan.io/tx/0xf55f2235099eeba295fea6df52695ee19b724db7adc76f2e727a81b6a2e48d83


    const owner = process.env.ACCOUNT
    // const owner = process.env.ACCOUNT
    const spender = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

    const currentAllowance = web3ViaInfuraProvider.utils.fromWei(await daiContract.methods.allowance(owner, spender).call())
    console.log(`\n${spender} is currently allowed to spend ${currentAllowance} DAI on behalf of ${owner}`)

    const approvalResult = await daiContract.methods.approve(spender, balanceOfDaiOnAccount).send({from: owner})

    console.log(approvalResult)

    const newAllowance = web3ViaInfuraProvider.utils.fromWei(await daiContract.methods.allowance(owner, spender).call())
    console.log(`\n${spender} is currently allowed to spend ${newAllowance} DAI on behalf of ${owner}`)

    // console.log(daiContract.methods)
    // console.log(uniswapV2Router02Contract.methods)


}

const showAnExampleCallOfAFunctionWhichIsDefinedWithinASmartContract = async () => {
    // console.log(uniswapV2Router02Contract.methods)
    const factoryAddress = await uniswapV2Router02Contract.methods.factory().call()
    console.log(`\n\nfactoryAddress: ${factoryAddress}`)

    const canonicalWETHAddress = await uniswapV2Router02Contract.methods.WETH().call()
    console.log(`\n\ncanonicalWETHAddress: ${canonicalWETHAddress}`)
}

showHowOneCanSwapAllDAIOnAccountToEther(web3ViaInfuraProvider)
// showAnExampleCallOfAFunctionWhichIsDefinedWithinASmartContract()







function getContract(provider: any, contractAddress: string, jsonInterfaceOfTheSmartContract: any) {

    Contract.setProvider(provider);

    return new Contract(jsonInterfaceOfTheSmartContract, contractAddress);
}





function getwWeb3ViaInfuraProvider(): any {

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`))

    return web3
}