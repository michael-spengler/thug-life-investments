require("dotenv").config();

import { ethers } from "ethers";
import { aaveLendingPoolV2ABI } from "./constants/aave-lending-pool-interface";
import { aaveWETHGateway } from "./constants/aave-weth-gateway";

const aaveLendingPoolV2Address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' // used for borrowing 
const aaveWETHGatewayAddress = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' // used for depositing Ether
// aaveLendingPoolV2ABI

export const borrowFiatStableCoin = async (): Promise<any | undefined> => {
  console.log("borrowing Fiat Stable Coin");

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY)
  const provider = ethers.getDefaultProvider('mainnet', {infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`})
  const account = signer.connect(provider)

  const aaveLendingPoolSmartContract = new ethers.Contract(aaveLendingPoolV2Address, aaveLendingPoolV2ABI, account)
  const aaveWETHGatewaySmartContract = new ethers.Contract(aaveWETHGatewayAddress, aaveWETHGateway, account)

  console.log(aaveWETHGatewaySmartContract)

  console.log("get Ether Balance")
  const etherBalanceOnAccount = await provider.getBalance(process.env.ACCOUNT)
  console.log(etherBalanceOnAccount)
  console.log(etherBalanceOnAccount.toString())
  // console.log(ethers.BigNumber.from(etherBalanceOnAccount))
  console.log(ethers.utils.formatEther(etherBalanceOnAccount.toString()).toString())

  // const tx = await aaveWETHGatewaySmartContract.depositETH(
  //   balanceOfDaiOnAccount,
  //   amountOutMin.toString(),
  //   path,
  //   process.env.ACCOUNT,
  //   deadline
  // )

  // console.log(tx.hash)

  return Promise.resolve(undefined);
};


borrowFiatStableCoin()