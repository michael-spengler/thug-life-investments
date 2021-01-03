const axios = require('axios')

export const isAnInvestmentRoundReasonable = async (): Promise<boolean> => {

  const gasPrice = (await axios.get('https://ethgasstation.info/json/ethgasAPI.json')).data.fastest
  console.log("checking if an investment round is reasonable");

  if (gasPrice <= 450) {
    console.log(`the gas price - ${gasPrice} - is fine`)
    return true
  } else {
    console.log(`the gas Price - ${gasPrice} - seems too high `)
    return false
  }
};
