const main = async () => {

    const [deployer] = await hre.ethers.getSigners();

    const wagmiContractFactory = await hre.ethers.getContractFactory("WagmiTkn");
    const wagmiTwoContractFactory = await hre.ethers.getContractFactory("WAGMI");

    const wagmiContract = await wagmiContractFactory.deploy();
    const wagmi = await wagmiContract.deployed();

    const wagmi2Contract = await wagmiTwoContractFactory.deploy();
    const wagmi2 = await wagmi2Contract.deployed();

    console.log(`Deployed by: ${deployer.address}`);
    console.log(`Deployed to: ${wagmi.address}`);

    console.log(`Deployed to: ${wagmi2.address}`);
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