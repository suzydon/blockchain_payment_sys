import React, { useEffect, useState } from "react";
import Web3 from "web3";
import PaymentForm from "./components/PaymentForm";
import Payment from "./contracts/Payment.json";

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Payment.networks[networkId];
        const instance = new web3.eth.Contract(
          Payment.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);
      }
    };
    initWeb3();
  }, []);

  return (
    <div>
      <h1>Blockchain Payment System</h1>
      {contract && <PaymentForm contract={contract} account={account} />}
    </div>
  );
};

export default App;
