const main = async () => {
    //get the address of the deployer
    const [deployer] = await hre.ethers.getSigners();
    //get balance
    let balance = deployer.balance;
    
    console.log(`The deployer of this app : ${deployer}`);
    console.log(`deployer balance : ${balance}`);
    //get the contract

    var contractFactory = await hre.ethers.getContractFactory("RecommendationPortal");
    var contract = await contractFactory.deploy();
    await contract.deployed();    
}

const run = async () => {
    try {
        main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

run();