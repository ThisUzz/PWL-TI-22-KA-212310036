import React from "react";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import { HandlePlay } from "../../constantas/PlayChat";
import { MessageConfirm, openModal } from "../../components/ModalPopUp";

export default function ChatBody({ data, profile, HandleRemove }) {
  const listdata = data;

  return (
    <div className="chat-items">
      {listdata.map((v, index) => (
        <div className="chat-item" style={styleChatItems.chatBubleItems} key={index}>
          {v.from_id !== profile ? <ChatItemSender data={v} /> : <ChatItemReceiver data={v} HandleRemove={HandleRemove} />}
        </div>
      ))}
    </div>
  );
}

const ChatItemSender = ({ data }) => {
  return (
    <div className="chat text-white rounded my-2 p-2" style={styleChatItems.chatBubleReceiver}>
      <span className="me-3">{data.messages}</span>
      <span className="chat-date" style={{ fontSize: "11px" }}>{moment(data.createdAt).format("HH:mm")}</span>
    </div>
  )
}

const ChatItemReceiver = ({ data, HandleRemove }) => {
  return (
    // Menampilkan label sentimen: Positif/Negatif/Netral
    <div className="chat text-white rounded my-2 p-2" style={{ ...styleChatItems.chatBubleSender, backgroundColor: ((data.sentiment === "Negatif") ? "#dc3545" : (data.sentiment === "Positif" ? "#1B84FF" : "#a198a7")) }}>
      <div className="d-flex justify-content-between">
        <span className={"me-3 "}>
          {data.messages}
        </span>
        <ButtonAction data={data} HandleRemove={HandleRemove} />
      </div>
      <span className="chat-date" style={{ fontSize: "11px" }}>{moment(data.createdAt).format("HH:mm")}</span>
    </div>
  )
}

const ButtonAction = ({ data, HandleRemove }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="transparant" id="dropdown-basic" className="btn-sm px-2 py-0" />

      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => openModal({ header: "Confirmation", message: <MessageConfirm HandlerSubmit={() => HandleRemove(data)} /> })}>Remove</Dropdown.Item>
        <Dropdown.Item onClick={() => HandlePlay(data.messages)}>Read</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
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


