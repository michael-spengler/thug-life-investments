require("dotenv").config();

import { ethers } from "ethers";
import { compoundEtherABI, compoundEtherTokenAddress } from "./constants/compound-ether";

console.log(`compound ether cETH Token Address: ${compoundEtherTokenAddress}`)

// const aaveLendingPoolV2Address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' // used for borrowing 
// const aaveWETHGatewayAddress = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' // used for depositing Ether
// aaveLendingPoolV2ABI

export const depositCryptoMoneyToCompound = async (): Promise<any | undefined> => {
  console.log("depositing ether to compound");

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY)
  const provider = ethers.getDefaultProvider('mainnet', {infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`})
  const account = signer.connect(provider)

  const compoundEtherSmartContract = new ethers.Contract(compoundEtherTokenAddress, compoundEtherABI, account)
  
  // console.log(compoundEtherSmartContract)
  // const bigNumberTotalBorrows = await compoundEtherSmartContract.totalBorrows()
  // console.log(bigNumberTotalBorrows)
  // console.log(ethers.utils.formatEther( bigNumberTotalBorrows ))
  
  // const totalReserves = await compoundEtherSmartContract.totalReserves()
  // console.log(totalReserves)
  // console.log(totalReserves.toString())
  // console.log(ethers.utils.formatEther( totalReserves ))
  // // console.log((await compoundEtherSmartContract.totalBorrows()).toString())
  
  // const totalSupply = await compoundEtherSmartContract.totalSupply()
  // console.log(totalSupply)
  // console.log(totalSupply.toString())
  // console.log(ethers.utils.formatEther( totalSupply ))

  // const totalBorrowsCurrent = await compoundEtherSmartContract.totalBorrowsCurrent()
  // console.log(totalBorrowsCurrent)
  // console.log(totalBorrowsCurrent.toString())
  // // console.log(ethers.utils.formatEther( totalBorrowsCurrent ))

  // const balanceOfUnderlying = await compoundEtherSmartContract.balanceOfUnderlying()
  // console.log(balanceOfUnderlying)
  // console.log(balanceOfUnderlying.toString())
  // // console.log(ethers.utils.formatEther( totalBorrowsCurrent ))

  const name = await compoundEtherSmartContract.name()
  console.log(name)
  console.log(name.toString())
  // console.log(ethers.utils.formatEther( totalBorrowsCurrent ))

  const result = await compoundEtherSmartContract.mint({value: '10000000000000000'})
  console.log(result)
  console.log(result.toString())
  // console.log(ethers.utils.formatEther( totalBorrowsCurrent ))

  // console.log("get Ether Balance")
  // const etherBalanceOnAccount = await provider.getBalance(process.env.ACCOUNT)
  // console.log(etherBalanceOnAccount)
  // console.log(etherBalanceOnAccount.toString())
  // // console.log(ethers.BigNumber.from(etherBalanceOnAccount))
  // console.log(ethers.utils.formatEther(etherBalanceOnAccount.toString()).toString())

  // // const tx = await aaveWETHGatewaySmartContract.depositETH(
  // //   balanceOfDaiOnAccount,
  // //   amountOutMin.toString(),
  // //   path,
  // //   process.env.ACCOUNT,
  // //   deadline
  // // )

  // // console.log(tx.hash)

  // return Promise.resolve(undefined);
};


depositCryptoMoneyToCompound()