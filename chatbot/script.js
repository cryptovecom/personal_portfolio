function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (userInput.trim() === "") return;
    document.getElementById("user-input").value = "";
    console.log(userInput);
    // Display the user's message
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<div class=\"w-full flex justify-end pb-3 \"><div class=\"relative max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5\"><div class=\"whitespace-pre-wrap\">" + userInput + "</div></div></div>"
    // chatbox.innerHTML += "<div><strong>Usuario:</strong> " + userInput + "</div>";;

    // Send the user's message to the backend
    fetch('http://localhost:3001/chat', { // Update this URL if needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput }) // Sending the message
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Ensure the bot's reply exists in the response
        if (data.reply) {
            console.log("data.reply:" + data.reply);
            // console.log("data.reply.data:" + data.reply.data);
            // console.log("data.reply.data.choices[0]:" + data.reply.data.choices[0]);
            // console.log("data.reply.data.choices[0].message:" + data.reply.data.choices[0].message);
            // console.log("data.reply.data.choices[0].message.content:" + data.reply.data.choices[0].message.content);
            // const botReply = data.reply.data.choices[0].message.content; // Adjust based on OpenAI API response structure
            // console(botReply);
            chatbox.innerHTML += "<div class=\"pb-3\"><strong>Chatbot:</strong> " + data.reply + "</div>";
        } else {
            chatbox.innerHTML += "<div class=\"pb-3\"><strong>Chatbot:</strong> Error: no se recibió respuesta.<div>";
        }

        // Clear the input field
        // document.getElementById("user-input").value = "";
        chatbox.scrollTop = chatbox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        chatbox.innerHTML += "<div><strong>Chatbot:</strong> Hubo un problema con la solicitud.<div>";
    });
}

const textarea = document.getElementById('user-input');  
textarea.addEventListener('keydown', function(event) {  
    if (event.key === 'Enter') {  
        event.preventDefault(); // Prevent default newline input  
        sendMessage(); // Call sendMessage function  
    }  
});
