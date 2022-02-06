require("dotenv").config();
const API_URL = process.env.API_URL
const PUBLIC_kEY = process.env.PUBLIC_kEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../src/artifacts/contracts/NFTite.sol/NFTite.json")

const contractAddress = "0x6d9763d7CB4B642c898dd7B23fAa09609E953C56"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT (tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_kEY, 'latest');

const tx = {
    from: PUBLIC_kEY,
    to : contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNft(PUBLIC_kEY,tokenURI).encodeABI()
}

 const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash){
        if (!err){
            console.log(`The hash of your transaction is ${hash},\n Check Alchemy mempool to view the status of your transaction!`);
        } else {
            console.err("Something went wrong", err)
        }
    }).catch((err) => {
        console.errror("promise failed", err)
    })
});

}
mintNFT("https://gateway.pinata.cloud/ipfs/QmcT8VmrFw9scDqZKYCGnz9kQ9CBYed3JfWFt1qDHRr66w");