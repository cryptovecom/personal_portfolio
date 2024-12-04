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

//    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//        model: 'gpt-4', 
//        messages: [{ role: 'user', content: userMessage }],
//    }, {
//       headers: {
//            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//            'Content-Type': 'application/json',
//        },
//    });
//    botMessage = response.data.choices[0].message.content;
//    console.log(botMessage);
//    res.json({ reply: botMessage });


    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', 
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const botMessage = response.data.choices[0].message.content;
        console.log(botMessage);

        res.json({ reply: botMessage });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to fetch response from AI model' });
    }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

