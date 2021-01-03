
require('dotenv').config()

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));

export const transfer = async () => {

    web3.eth.getGasPrice().then((gasPrice) => {
        web3.eth.getTransactionCount(process.env.SOURCE_ACCOUNT, 'pending').then((nonce) => {
            let txParams = {
                nonce: web3.utils.toHex(nonce),
                gasLimit: web3.utils.toHex(web3.utils.toHex(33000)),
                gasPrice: web3.utils.toHex(gasPrice),
                from: process.env.SOURCE_ACCOUNT,
                to: process.env.ACCOUNT,
                value: 0.07 * 1000000000000000000,
                chainId: web3.utils.toHex(1),
            }
            let tx = new Tx(txParams);
            let privKey = Buffer.from(process.env.SOURCE_ACCOUNT_PRIVATE_KEY, 'hex');
            tx.sign(privKey);
            tx = "0x" + tx.serialize().toString('hex')
            web3.eth.sendSignedTransaction(tx)
                .on('transactionHash', (hash) => {
                    console.log(hash);
                })
                .on('receipt', (receipt) => {
                    console.log(receipt);
                    return "receipt"
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log(confirmationNumber);
                    console.log(receipt);
                })
                .on('error', console.error);
        })
    });
}

transfer()