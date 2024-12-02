const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage);
    
    // Simulating a response from an AI model or bot
    // const botResponse = generateBotResponse(userMessage);
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage }],
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });
    botMessage = response.data.choices[0].message.content;
    console.log(botMessage);
    // res.send('<Response></Response>');
    // res.json({ reply: botMessage });
    res.json({ reply: botMessage });
});

function generateBotResponse(message) {
    // A simple simulation of generating a response based on input message
    return `You said: "${message}". This is a simulated response.`;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

