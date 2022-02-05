require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  //WAGMI
  // networks: {
  //   rinkeby: {
  //     url: "https://rinkeby.infura.io/v3/c5d34f30dfb847d2933181da76ff087e" ,
  //   accounts: ["5d00cef7a5705a1db1262c2b3ab5afe7d6b39259d464c927ccf8a804009f5419"]
  //    }
  //   }

    networks: {
      rinkeby: {
        url: "https://eth-rinkeby.alchemyapi.io/v2/16k_1ASgiyJh18bnYvV8sW6aADZ7TQMm" ,
      accounts: ["1a4823d90bc72d354903a8b4ec71ec9c953393fcc87455e7b6145e3aefb9fdc2"]
       }
      }
};
