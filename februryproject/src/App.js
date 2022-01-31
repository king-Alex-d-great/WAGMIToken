import image from './Images/buildspaceImage-removebg-preview.png'
import './App.css';
import './index.css';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WagmiAbi from './artifacts/contracts/WagmiTkn.sol/WagmiTkn.json'

const wagmiAddress = "0x8fB626A16EA7D67edD44A52Aae8F455B8cA3211c";
const abi = WagmiAbi.abi;
function App() {
  const { ethereum } = window;
  let balance = 0; 
  const [userHasMetaMask, setUserHasMetaMask] = useState(false);
  const [userHasConnectedccount, setUserHasConnectedAccount] = useState(false);
  const [userAccount, setUserAccount] = useState();
  const [tokenAmount, setTokenAmount] = useState();

  const checkForMetaMask = async () => {
    if (!ethereum) {
      console.log("You need to install metamask");          
      return false;
    }
    console.log("Yhup! You got metamask")
    setUserHasMetaMask(true);
    await checkForAuthenticatedEthereumWallet();
    return true;
  }

  const checkForAuthenticatedEthereumWallet = async () => {
    var accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      console.log(`Authorized Account found: ${accounts[0]}`);     
      return;
    }
    console.log("no account found ");
  }

  const connectWallet = async () => {
    let hasMetaMask = await checkForMetaMask();

    if (hasMetaMask) {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setUserAccount(accounts[0]);
      setUserHasConnectedAccount(true);
    } else {
      console.log("You need to install metamask to proceed");
    }
  }

  const getTokenBalance = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wagmiContract = new ethers.Contract(wagmiAddress, abi, signer);
    const balance = await wagmiContract.balanceOf(userAccount);
    console.log(`Balance : ${balance.toString()}`)
  }

  const sendWagmiToken = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wagmiContract = new ethers.Contract(wagmiAddress, abi, signer);
    const txn = await wagmiContract.transfer(userAccount, tokenAmount);
    await txn.wait();
    console.log(`${tokenAmount} WagmiTkn Sent to ${userAccount}`);
  }

  useEffect(() => {
    checkForMetaMask();
    balance = getTokenBalance();
  });

  return (
    <div className="App">
      <header className="App-header">      
       
      {
        userHasMetaMask && !userHasConnectedccount ?  (<div className='connect'>
          <p>Your metamask wallet needs to be connected for you to proceed</p>
            <button onClick={connectWallet} className='btn'>
              Connect your wallet
            </button> 
        </div>)
        : userHasConnectedccount ? 
        <main>
        <section>
               <div className='image'>
                    <img src={image} alt="us" className="App-logo"/>
               </div>
               <div className='inputs'>
                   <div className="texts">
                     {/* <p>You have {balance} WAGMI</p> */}
                       <input placeholder='Address to be WAGMI-RIZED ' onChange={e => setUserAccount(e.target.value)} />
                       <input placeholder='WAGMI amount' onChange={e => setTokenAmount(e.target.value)}/>
                   </div>

                   <button className='btn' onClick={sendWagmiToken}>
                        Make a friend Happy
                   </button>
                  
               </div>
               <div className='balance'>

               </div>
        </section>

    </main>
        :
        <h1> You need to  <a href="https://metamask.io/">download the Metamask chrome extension</a> to proceed </h1>
      }        
       
      </header>     
    </div>
  );
}

export default App;