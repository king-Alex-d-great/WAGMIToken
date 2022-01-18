const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //compile our contact and create the files we need to work with our contract under the artifacts directory 
    const recommendationContractFactory = await hre.ethers.getContractFactory("RecommendationPortal");
    //Here hardhat will create a local ethereum network fro us and deploy our contract
    //It will destroy the blockchain after the script finishes
    //and create a fresh blockchain for everytime we run the contract
    const recommendationContract = await recommendationContractFactory.deploy(); 
    //
    await recommendationContract.deployed(); //we will wait until our cintract finishes deploying
   //recommendation COntract.adress gives us the actual address our contract was deployed to
    console.log(`contract deployed to ${recommendationContract.address}`);
    console.log(`contract deployed by ${owner.address}`);

    let aboutMeCount = await recommendationContract.getTotalAboutMes();

    let aboutMeTxn = await recommendationContract.sendAboutMe("I write beautiful and secure contracts");
    await aboutMeTxn.wait();

    aboutMeCount = await recommendationContract.getTotalAboutMes();

    console.log("simulating a random oerson sending an about me\n")
    aboutMeTxn = await recommendationContract.connect(randomPerson).sendAboutMe("I love to eat beans");
    aboutMeCount = await recommendationContract.getTotalAboutMes();

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

runMain();