const main = async () => {

    const [deployer] = await hre.ethers.getSigners();

   const wagMiContractFactory = await hre.ethers.getContractFactory("WagmiTkn");
    
    const wagmiContract = await wagMiContractFactory.deploy();
     
    await wagmiContract.deployed(); 

    console.log(`contract deployed to ${wagmiContract.address}`);
    console.log(`contract deployed by ${deployer.address}`);  
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();