require("dotenv").config();

const API_URL = process.env.API_URL;
const PUBLIC_kEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../src/artifacts/contracts/NFTite.sol/NFTite.json");

//run node scripts/GmMint-nft.js
//upload json file to pinata
//
const contractAddress = "0x6d9763d7CB4B642c898dd7B23fAa09609E953C56";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenData) {

    const nonce = await web3.eth.getTransactionCount(PUBLIC_kEY, "latest");

    const tx = {
        'from': PRIVATE_KEY,
        'to': PUBLIC_kEY,
        'nonce': nonce,
        'gas': 10,
        'data': nftContract.methods.mintNFT(PUBLIC_kEY, tokenData).encodeABI()
 };

 const signPromise =  web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
 signPromise.then((signedTx) => {
     web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash){
         if (!err) {
             console.log("the hash of your transaction is ", hash);
         } else {
             console.log("something went wrong when submitting your transaction", err)
         }
     })
 }).catch( (err) => {
     console.log("promise failed", err);
 });

 //upload metadata to pinata
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"
);