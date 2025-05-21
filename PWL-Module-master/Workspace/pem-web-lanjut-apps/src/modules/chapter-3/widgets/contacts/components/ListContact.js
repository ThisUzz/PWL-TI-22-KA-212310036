import React from "react";
import { AccountLong } from "../../components/AccountUI";

export default function ListContact({myFriends}) {
  return (
    <div className="ms-5">
        <h4>My Friends</h4>
      <div className="my-friends d-flex align-items-center">
        {myFriends.map((v, index) => (
            <AccountLong data={v} color={v.color} key={index} />
        ))}
      </div>
    </div>
  );
}
