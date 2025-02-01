import React, { useState } from "react";
import Web3 from "web3";

const PaymentForm = ({ contract, account }) => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  // Fetch balance
  const fetchBalance = async () => {
    const balance = await contract.methods.getBalance().call({ from: account });
    setBalance(Web3.utils.fromWei(balance, "ether"));
  };

  // Send payment
  const handlePayment = async () => {
    const amountInWei = Web3.utils.toWei(amount, "ether");
    await contract.methods.sendPayment(receiver, amountInWei).send({ from: account });
    alert("Payment sent successfully!");
    fetchBalance();
  };

  return (
    <div>
      <h2>Your Balance: {balance} ETH</h2>
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Send Payment</button>
    </div>
  );
};

export default PaymentForm;
