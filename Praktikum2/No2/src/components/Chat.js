// src/components/Chat.jsx
import React from "react";
import ChatBubbleItem from "./ChatBubbleItem";
import ChatDateSeparator from "./ChatDateSeparator";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const listData = [
  { id: uuidv4(), from: "user1", message: "Udah sampe tugu, Macet", date: "2024-02-22T10:35:00" },
  { id: uuidv4(), from: "user2", message: "Dimana?", date: "2024-02-22T10:30:00" },
  { id: uuidv4(), from: "user1", message: "Okayyy ", date: "2024-02-22T10:52:00" },
  { id: uuidv4(), from: "user2", message: "Yaudah kabarin klo udah sampe", date: "2024-02-22T10:50:00" },
  { id: uuidv4(), from: "user1", message: "Dah sampe nihh", date: "2024-02-22T10:59:00" },
  { id: uuidv4(), from: "user2", message: "Gua di deapan nih", date: "2024-02-23T16:16:00" },
  { id: uuidv4(), from: "user2", message: "Buruan", date: "2024-02-23T16:35:00" },
  { id: uuidv4(), from: "user1", message: "Okee wait", date: "2024-02-23T16:36:00" },
];

const Chat = () => {
  const currentUser = "user2";

  // Urutkan berdasarkan tanggal
  const sortedData = [...listData].sort((a, b) => new Date(a.date) - new Date(b.date));

  let lastDate = "";

  return (
    <div className="container mt-4">
      <div className="card p-3 shadow-sm">
        <h5 className="text-center">Chats</h5>
        <div style={{ height: "400px", overflowY: "auto", backgroundColor: "#f0f2f5" }} className="p-2 rounded">
          {sortedData.map((chat) => {
            const chatDate = moment(chat.date).format("YYYY-MM-DD");
            const showDateSeparator = chatDate !== lastDate;
            lastDate = chatDate;
            
            return (
              <React.Fragment key={chat.id}>
                {showDateSeparator && <ChatDateSeparator date={chat.date} />}
                <ChatBubbleItem data={chat} isMe={chat.from === currentUser} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
