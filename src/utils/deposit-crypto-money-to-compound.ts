// https://compound.finance/docs/ctokens#mint

require("dotenv").config();

import { ethers } from "ethers";
import { compoundEtherABI, compoundEtherTokenAddress } from "./constants/compound-ether";

console.log(`compound ether cETH Token Address: ${compoundEtherTokenAddress}`)

export const depositCryptoMoneyToCompound = async (): Promise<any | undefined> => {
  console.log("depositing ether to compound");

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY)
  const provider = ethers.getDefaultProvider('mainnet', { infura: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}` })
  const account = signer.connect(provider)

  const compoundEtherSmartContract = new ethers.Contract(compoundEtherTokenAddress, compoundEtherABI, account)

  const name = await compoundEtherSmartContract.name()
  console.log(name)
  console.log(name.toString())

  const result = await compoundEtherSmartContract.mint({ value: '10000000000000000' })
  console.log(result)

  console.log(`https://etherscan.io/tx/${result.hash}`)
};


depositCryptoMoneyToCompound()