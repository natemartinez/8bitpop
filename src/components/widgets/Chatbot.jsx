import React, { useState } from "react";
import axios from "axios";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");


    const sendMessage = async () => {
        if (!input.trim()) return;

        setInput('');

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);

        try {
            const response = await axios.post('http://localhost:3001/generate', {
                input: input,
            });
            
            const botReply = response.data.result || "I'm not sure how to respond.";
            console.log("Bot reply:", botReply);
            setMessages([...newMessages, { sender: "bot", text: botReply }]);
        } catch (error) {
            setMessages([...newMessages, { sender: "bot", text: "Error generating response." }]);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask something..." 
            />
            <button className='chat-send' onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
