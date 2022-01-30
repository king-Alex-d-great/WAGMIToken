const main = async () => {

    const [deployer] = await hre.ethers.getSigners();

    const wagmiContractFactory = await hre.ethers.getContractFactory("WagmiTkn");

    const wagmiContract = await wagmiContractFactory.deploy();
    await wagmiContract.deployed();

    console.log(`Deployed by: ${deployer.address}`);
    console.log(`Deployed to: ${wagmiContract.address}`);
}

const run = async () => {   
        await main()
        .then(() => process.exit(0))
        .catch(err =>{
            console.log(`error occured: ${err}`)
        process.exit(1);
        });        
      
}

run();