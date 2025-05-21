import React from "react";
import moment from "moment";
import { GroupByKey } from "../../../../../apps/helpers/GeneralHelper";

export default function ChatBodyWithGrouped({ data, profile }) {
  const itsme = profile.id;
  const today = moment().format("YYYY-MM-DD");

  const data_chat = GroupByKey(data, "date_fmt");

  return (
    <div className="chat-items">
      {Object.keys(data_chat).map((m, index) => (
        <div key={index}>
          <div className="text-center">
            {today === m ? (
              <span className="bg-white rounded p-2 fst-italic fs-6 text-body-tertiary">Today</span>
            ) : <span className="bg-white rounded p-2 fst-italic fs-6 text-body-tertiary">{moment(m).format("DD MMM YYYY")}</span>}
          </div>
          {data_chat[m].map((v, index) => (
            <div className="chat-item" style={styleChatItems.chatBubleItems} key={index}>
              <div className="chat text-white rounded my-2 p-2" style={((v.from_id === itsme) ? styleChatItems.chatBubleSender : styleChatItems.chatBubleReceiver)}>
                <span className="me-3">{v.messages}</span>
                <span className="chat-date" style={{ fontSize: "11px" }}>{moment(v.date).format("HH:mm")}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styleChatItems = {
  chatBubleItems: {
    display: "flex",
    flexDirection: "column",
  },
  chatBubleSender: {
    textAlign: "right",
    backgroundColor: "#a198a7",
    alignSelf: "flex-end"
  },
  chatBubleReceiver: {
    backgroundColor: "#a83aef",
    alignSelf: "flex-start"
  },
};


