const express = require('express');
const axios = require('axios');

const app = express();
const port = 5004;

// Endpoint to receive input from the blockchain
app.post('/input', async (req, res) => {
    const input = req.body.input;
    // Process input and generate notice
    const notice = processInput(input);
    // Send notice to the Cartesi machine
    await sendNotice(notice);
    res.status(200).send('Input processed');
});

// Function to process input and generate notice
function processInput(input) {
    // Your custom logic to process input
    const notice = `Processed input: ${input}`;
    return notice;
}

// Function to send notice to the Cartesi machine
async function sendNotice(notice) {
    try {
        await axios.post('http://localhost:5004/notice', { notice });
    } catch (error) {
        console.error('Error sending notice:', error);
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Cartesi Node running at http://localhost:${port}`);
});
