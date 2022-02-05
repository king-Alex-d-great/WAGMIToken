const main = async () => {
    const nftFactory = await hre.ethers.getContractFactory("NFTite");

    const nFtContract = await nftFactory.deploy();
    let contrat = await  nFtContract.deployed();
    console.log(contrat.address)
}

main()
.then(() => process.exit(0)) 
.catch((error) => {
    console.error(error);
    process.exit(1);
});