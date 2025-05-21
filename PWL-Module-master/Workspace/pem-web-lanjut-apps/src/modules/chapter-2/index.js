import React, { useState } from "react";
import { ContactUI, MessegersUI } from "./widgets";
import { Messegers, MyFriend } from "./widgets/constantas/DataChat";

export function ChapterTwo() {
  const accountArr = localStorage.getItem("user_account");
  const [myprofile, setMyprofile] = useState(JSON.parse(accountArr));
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedChat, setSelectedChat] = useState([]);

  const HandlerSelectedChat = (data) => {
    setSelectedUser(data);
    const the_msg = [...Messegers]
    const findChatByUserID = the_msg.find(item => item.user_id === data.user_id)
    if (findChatByUserID) {
      setSelectedChat(findChatByUserID.messages);
    } else {
      setSelectedChat([]);
    }
  }


  return (
    <div>
      <h1 className="text-white mb-5">
        Chapter two: The Authentications and Messegers
      </h1>
      <div className="px-5">
        <div className="row">
          <div className="col-2 col-lg-3 col-xxl-4 px-0">
            {myprofile ? (
              <ContactUI
                my_account={myprofile}
                friends={MyFriend}
                selectedUser={selectedUser}
                HandlerSelectedChat={HandlerSelectedChat}
              />
            ) : ""}

          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            {myprofile ? (
              <MessegersUI
                profile={myprofile}
                selectedUser={selectedUser}
                selectedChat={selectedChat}
              />
            ) : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
