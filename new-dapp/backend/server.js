const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize provider and contract
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const privateKey = process.env.PRIVATE_KEY;  // Load private key from environment variable
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Replace with your contract address
// Replace with your contract's ABI
const contractABI = [/* Contract ABI here */];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Endpoint to cast a vote
app.post('/vote', async (req, res) => {
    const { option } = req.body;
    try {
        // Interact with the contract to cast vote
        const tx = await contract.vote(option);
        // Wait for the transaction to be mined
        await tx.wait();
        res.status(200).send('Vote cast successfully');
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
