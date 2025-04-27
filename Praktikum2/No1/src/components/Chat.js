// src/components/Chat.jsx
import React from "react";
import ChatBubbleItem from "./ChatBubbleItem";
import moment from "moment";

const listData = [
  { from: "user1", message: "Mas tau ga kenapa bumi itu bulat?", date: moment() },
  { from: "me", message: "Gatau kenapa gitu?", date: moment() },
  { from: "user1", message: "Ya gapapa gua nanya aja", date: moment() },
  { from: "me", message: "Yeuuuuu", date: moment() },
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
