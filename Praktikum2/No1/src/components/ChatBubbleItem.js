// src/components/ChatBubbleItem.jsx
import React from "react";
import moment from "moment";

const ChatBubbleItem = ({ data, isMe }) => {
  return (
    <div className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`p-2 rounded shadow-sm ${
          isMe ? "bg-primary text-white" : "bg-light text-dark"
        }`}
        style={{ maxWidth: "60%" }}
      >
        <span>{data.message}</span>
        <div className="text-end" style={{ fontSize: "11px" }}>
          {moment(data.date).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default ChatBubbleItem;
