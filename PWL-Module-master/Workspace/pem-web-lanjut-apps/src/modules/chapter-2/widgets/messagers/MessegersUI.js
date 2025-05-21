import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonPrimary, ButtonSearch } from "../components/ButtonUI";
import moment from "moment";
import ChatBodyWithGrouped from "./components/ChatBodyWithGrouped";

export function MessegersUI({ profile, selectedChat, selectedUser }) {
  const [myChat, setMyChat] = useState([]);

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [search, setSearch] = useState([]);
  const ResultMessageData = useMemo(() => {
    let computedData = myChat.map((msg) => ({
      ...msg,
      date_fmt: moment(msg.date).format("YYYY-MM-DD"),
      isOutgoing: msg.from_id === profile.id
    }));
    if (search) {
      computedData = computedData.filter(
        listData => {
          return Object.keys(listData).some(key =>
            listData[key].toString().toLowerCase().includes(search)
          );
        }
      );
    }

    return computedData;
  }, [myChat, profile.id, search]);

  useEffect(() => {
    setMyChat(selectedChat)
    scrollToBottom();
  }, [selectedChat]);

  const [writeChat, setWriteChat] = useState("");
  const [chatMsg, setChatMsg] = useState("");

  const HandlerSendChat = (e) => {
    e.preventDefault();
    if (writeChat.trim()) {
      const objChat = {
        id: myChat.length + 1,
        from_id: profile.id,
        messages: writeChat,
        to_user_id: selectedUser.user_id,
        date: moment().format("YYYY-MMM-DD HH:mm"),
      };
      setMyChat(currentChats => [...currentChats, objChat]);
      setWriteChat("");
      setChatMsg("");
      scrollToBottom();
    } else {
      setChatMsg("Please fill up the field");
    }
  };

  return (
    <div className="card card-flush h-100 mb-5 mb-xl-10  rounded-0 rounded-end-1">
      {selectedUser ? (
      <div className="card-header">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bold mb-2 text-gray-900">Chats with {selectedUser.name}</span>
        </h3>
        {ResultMessageData.length > 0 ? (
          <div className="card-toolbar">
            <ButtonSearch setSearch={setSearch} >
              <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    opacity="0.5"
                    x="17.0365"
                    y="15.1223"
                    width="8.15546"
                    height="2"
                    rx="1"
                    transform="rotate(45 17.0365 15.1223)"
                    fill="currentColor"
                  ></rect>
                  <path
                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </ButtonSearch>
          </div>
        ) : ""}
      </div>
      ) : ""}
      <div className="card-body d-flex flex-column justify-content-between p-0 bg-light-primary h-100">
        {ResultMessageData.length > 0 ? (
          <>
            <div className="chat-message px-2 h-100" style={StylesMessager.chatBox}>
              <ChatBodyWithGrouped data={ResultMessageData} profile={profile} />
              <div ref={endOfMessagesRef} />
            </div>
            <div className="chat-send bg-light p-3">
              <form
                method="post"
                autoComplete="off"
                onSubmit={(e) => HandlerSendChat(e)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    autoFocus={true}
                    value={writeChat}
                    onChange={(e) => setWriteChat(e.target.value)}
                  />
                  <ButtonPrimary
                    items={{
                      title: "Send",
                      btn_class: "btn-icon btn-success",
                      type: "submit",
                    }}
                  >
                    <i className="bi bi-send"></i>
                  </ButtonPrimary>
                </div>
                <span className="text-danger">{chatMsg}</span>
              </form>
            </div>
          </>
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}

const StylesMessager = {
  chatBox: {
    flexGrow: 1,
    overflowY: 'auto',
    maxHeight: "calc(100vh - 150px)"
  },
};

const EmptyChat = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="info text-center">
        <h1>No Conversations</h1>
        <p>You didn't made any conversation yet, please select username</p>
        <span className="badge badge-primary">Start a chat</span>
      </div>
    </div>
  );
};
