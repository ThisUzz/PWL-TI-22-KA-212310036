// src/components/Chat.jsx
import React from "react";
import ChatBubbleItem from "./ChatBubbleItem";
import moment from "moment";

const listData = [
  { from: "user1", message: "Halo!", date: moment() },
  { from: "me", message: "Hai, ada yang bisa dibantu?", date: moment() },
  { from: "user1", message: "Cepe ada?", date: moment() },
  { from: "me", message: "Bowleh", date: moment() },
];

const Chat = () => {
  const currentUser = "me";

  return (
    <div className="container mt-4">
      <div className="card p-3">
        <h5 className="text-center">Chat Room</h5>
        <div className="d-flex flex-column gap-2">
          {listData.map((v, index) => (
            <ChatBubbleItem key={index} data={v} isMe={v.from === currentUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
