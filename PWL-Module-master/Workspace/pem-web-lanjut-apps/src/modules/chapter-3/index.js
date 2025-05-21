import React, { useEffect, useState } from "react";
import { ContactUI, MessegersUI } from "./widgets";
import { FETCH_CONTACT_CHAT } from "./widgets/api/APIs";
import { MySkeleton } from "./widgets/components/SkeletonUI";
import { AlertNotif } from "./widgets/components/AlertUI";
import ModalPopUp from "./widgets/components/ModalPopUp";

export function ChapterThree() {
  const accountArr = localStorage.getItem("user_account");
  const myprofile = JSON.parse(accountArr);
  const [selectedUser, setSelectedUser] = useState({});
  
  const HandlerSelectedChat = (data) => {
    setSelectedUser(data);
  };

  const [myFriends, setMyFriends] = useState({
    loading: false,
    data: [],
    messages: "",
  });

  useEffect(() => {
    FETCH_CONTACT_CHAT(setMyFriends);
  }, []);

  return (
    <div>
      <h1 className="text-white mb-5">
        Chapter three: Connection to Middleware
      </h1>
      <div className="px-5">
        <div className="row">
          <div className="col-12 col-lg-3 col-xxl-4 px-0 d-none d-lg-block">
            {myFriends.loading ? (
              <MySkeleton />
            ) : myFriends.messages ? (
              <AlertNotif color={"danger"} message={myFriends.messages} />
            ) : Object.values(myFriends.data).length > 0 ? (
              <ContactUI
                my_account={myprofile}
                friends={myFriends.data}
                selectedUser={selectedUser}
                HandlerSelectedChat={HandlerSelectedChat}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-12 col-lg-9 col-xxl-8 px-0">
            {(Object.keys(selectedUser).length > 0) ? (
              <MessegersUI
                profile={myprofile}
                selectedUser={selectedUser}
              />
            ) : (
              <div className="card-body d-flex flex-column justify-content-between p-0 bg-light-primary h-100">
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <div className="info text-center">
                    <h1>No Conversations</h1>
                    <p>
                      You didn't made any conversation yet, please select
                      username
                    </p>
                    <span className="badge badge-primary">Start a chat</span>
                  </div>
                </div>
              </div>
            )}
          </div >
        </div >
      </div >
      <ModalPopUp />
    </div >
  );
}
