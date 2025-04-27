// src/components/ChatBubbleItem.jsx
import React from "react";
import moment from "moment";

const ChatBubbleItem = ({ data, isMe }) => {
  return (
    <div className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"} my-1`}>
      <div
        className={`p-2 rounded ${
          isMe ? "bg-secondary text-white" : "bg-primary text-white"
        }`}
        style={{ maxWidth: "60%" }}
      >
        <div>{data.message}</div>
        <div className="text-end" style={{ fontSize: "11px" }}>
          {moment(data.date).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default ChatBubbleItem;
