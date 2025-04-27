// src/components/ChatDateSeparator.jsx
import React from "react";
import moment from "moment";

const ChatDateSeparator = ({ date }) => {
  const formattedDate = moment(date).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "DD MMM YYYY",
    sameElse: "DD MMM YYYY",
  });

  return (
    <div className="text-center my-2">
      <span className="badge bg-light text-muted">{formattedDate}</span>
    </div>
  );
};

export default ChatDateSeparator;
