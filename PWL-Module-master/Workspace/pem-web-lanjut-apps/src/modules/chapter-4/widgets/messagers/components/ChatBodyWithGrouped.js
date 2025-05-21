import React from "react";
import moment from "moment";
import { GroupByKey } from "../../../../../apps/helpers/GeneralHelper";
import ChatBody from "./ChatBody";

export default function ChatBodyWithGrouped({ data, profile, HandleRemove }) {
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
          <ChatBody data={data_chat[m]} profile={itsme} HandleRemove={HandleRemove} />
        </div>
      ))}
    </div>
  );
}