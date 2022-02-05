const main = async () => {
    const nftFactory = await hre.ethers.getContractFactory("NFTite");

    const nFtContract = await nftFactory.deploy(); //Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract.
    let contrat = await  nFtContract.deployed();
    console.log(contrat.address)
}

main()
.then(() => process.exit(0)) 
.catch((error) => {
    console.error(error);
    process.exit(1);
});