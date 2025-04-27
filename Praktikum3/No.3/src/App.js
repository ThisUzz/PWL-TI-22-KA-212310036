import React, { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "Nanya dong", time: "20:10", fromUser: false },
    { text: "Kenapa?", time: "20:15", fromUser: true },
    { text: "Singkong yang difermentasi itu namanya apa ?", time: "20:15", fromUser: false },
    { text: "Cape ya..", time: "20:10", fromUser: false },
    { text: "Steak yang kematangannya itu disebut apa ya ?", time: "20:10", fromUser: true },
    { text: "We're done ya..", time: "20:10", fromUser: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fromUser: true,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="profile-picture">F</div>
          <div className="profile-info">
            <div className="profile-name">Febry</div>
            <div className="profile-number">0419028203</div>
          </div>
        </div>

        <div className="contact-search">
          <input type="text" placeholder="Search here" />
        </div>

        <div className="contact-list">
          {/* Dummy contact list */}
          {["Septian", "Jemi", "Edi", "Suci", "Isnan", "Anton"].map((name, idx) => (
            <div className={`contact-item ${name === "Jemi" ? "active" : ""}`} key={idx}>
              <div className="contact-icon">{name.charAt(0)}</div>
              <div className="contact-details">
                <div className="contact-name">{name}</div>
                <div className="contact-number">{Math.floor(Math.random() * 1000)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="end-encrypted">
          Your personal messages are end-to-end encrypted
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-area">
        <div className="chat-header">
          <div className="chat-title">Chats with Jemi</div>
          <div className="chat-search">
            <input type="text" placeholder="Search here" />
          </div>
        </div>

        <div className="chat-date">
          22 Feb 2024
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.fromUser ? "user" : "friend"}`}>
              <div className="message-bubble">
                <span className="message-text">{msg.text}</span>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default App;
