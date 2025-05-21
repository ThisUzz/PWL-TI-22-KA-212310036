import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonIcon, ButtonPrimary, ButtonSearch } from "../components/ButtonUI";
import moment from "moment";
import Sentiment from 'sentiment'; // Import Sentiment
import ChatBodyWithGrouped from "./components/ChatBodyWithGrouped";
import { FilterWords } from "../constantas/SentimentWords";
import { PlayTheAllChat } from "../constantas/PlayChat";
import { GET_SELECTED_CHAT, REMOVE_CHAT, SEND_CHAT } from "../api/APIs";
import { AlertNotif } from "../components/AlertUI";

export function MessegersUI({ profile, selectedUser }) {
  const [selectedChat, setSelectedChat] = useState({
    loading: false,
    data: [],
    message: "",
  });
  const [myChat, setMyChat] = useState([]);

  const ReloadData = (user_id) => {
    const param = { from_id: profile.id, to_user_id: user_id };
    GET_SELECTED_CHAT(param, setSelectedChat, setMyChat);
  }

// Inisialisasi instance Sentiment.js untuk analisis sentimen
  const sentiment = new Sentiment();

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [search, setSearch] = useState([]);
  const ResultMessageData = useMemo(() => {
    let computedData = [];
    if (Object.values(myChat).length > 0) {
      computedData = myChat.map((msg) => {

        const result = sentiment.analyze(msg.messages);             // Analisis sentimen dari teks pesan
        let sentimentLabel = 'Netral';                              // Menentukan label sentimen berdasarkan skor Netral
        if (result.score > 0) sentimentLabel = 'Positif';           // Menentukan label sentimen berdasarkan skor Positif
        else if (result.score < 0) sentimentLabel = 'Negatif';      // Menentukan label sentimen berdasarkan skor Negatif

        return {
          ...msg,
          sentiment: sentimentLabel,
          date_fmt: moment(msg.createdAt).format("YYYY-MM-DD"),
          isOutgoing: msg.from_id === profile.id
        }
      });

    }

    computedData.sort((a, b) => (a.id > b.id ? 1 : -1));

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
    // const interval = setInterval(() => {
       ReloadData(selectedUser.id)
    // }, 3000);
    // return () => clearInterval(interval);
  }, [selectedUser.id]);

  const [writeChat, setWriteChat] = useState("");
  const [chatMsg, setChatMsg] = useState("");

  const [sendChat, setSendChat] = useState({ loading: false, data: [], message: "" });

  const HandlerSendChat = (e) => {
    e.preventDefault();
    if (writeChat.trim()) {

      // filter word
      // Setiap pesan yang ditulis (writechat) akan disaring menggunakan (FilterWords) 
      const msg = writeChat.toLowerCase();
      const theMessage = FilterWords(msg);
      //end filter

      const paramPost = {
        from_id: profile.id,
        messages: theMessage,
        to_user_id: selectedUser.id,
      }
      SEND_CHAT(paramPost, setSendChat);
      setWriteChat("");
      setChatMsg("");
      scrollToBottom();
      setTimeout(() => {
        ReloadData(selectedUser.id)
      }, 1000);

    } else {
      setChatMsg("Please fill up the field");
    }
  };


  const HandleRemove = (data) => {
    REMOVE_CHAT({ id: data.id })
    setTimeout(() => {
      ReloadData(selectedUser.id)
    }, 1000);
  }


  return (
    <div className="card card-flush h-100 mb-5 mb-xl-10  rounded-0 rounded-end-1">
      {selectedUser ? (
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bold mb-2 text-gray-900">Chats with {selectedUser.fullname}</span>
          </h3>
          {Object.values(selectedChat.data).length > 0 ? (
            <div className="card-toolbar">
              <div className="d-flex align-items-center">
                <div className="me-5">
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
                <ButtonIcon title={"Play chat"} onAction={() => PlayTheAllChat(ResultMessageData, selectedUser, profile.id)} >
                  <i className="bi bi-play-circle fs-1"></i>
                </ButtonIcon>
              </div>
            </div>
          ) : ""}
        </div>
      ) : ""}
      <div className="card-body d-flex flex-column justify-content-between p-0 bg-light-primary h-100">
        <div className="chat-message px-2 h-100" style={StylesMessager.chatBox}>
          {Object.values(selectedChat.data).length > 0 ? (
            <>
              <ChatBodyWithGrouped data={ResultMessageData} profile={profile} HandleRemove={HandleRemove} />
              <div ref={endOfMessagesRef} />
              {sendChat.message ? <AlertNotif color={"danger"} message={sendChat.message} /> : ""}
            </>
          ) : ""} 
        </div>
        <div className="chat-send bg-light p-3">
          <div className="notes d-flex mb-3">
            <span>Sentimental Status:</span>
            <div className="d-flex align-items-center ms-2">
              <div className="p-2 bg-primary rounded me-1"></div>
              <span className="text-primary">Positive</span>
            </div>

            <div className="d-flex align-items-center mx-2">
              <div className="p-2 bg-secondary rounded me-1"></div>
              <span className="text-dark">Netral</span>
            </div>

            <div className="d-flex align-items-center">
              <div className="p-2 bg-danger rounded me-1"></div>
              <span className="text-danger">Negative</span>
            </div>
          </div>
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
