import React, { useMemo, useState } from "react";
import { AccountLong } from "../components/AccountUI";
import { ButtonIcon, ButtonSearch } from "../components/ButtonUI";
import { Link } from "react-router-dom";

export function ContactUI({ my_account, friends, selectedUser, HandlerSelectedChat }) {
  const [search, setSearch] = useState([]);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const toggleSorting = (field) => {
    if (sorting.field === field) {
      setSorting({ ...sorting, order: sorting.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSorting({ field: field, order: 'asc' });
    }
  };

  const ResultData = useMemo(() => {
    let computedData = friends;
    computedData = computedData.filter(item => item.id !== my_account.id);

    if (search) {
      computedData = computedData.filter(
        listData => {
          return Object.keys(listData).some(key =>
            listData[key].toString().toLowerCase().includes(search)
          );
        }
      );
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) =>
          reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return computedData;
  }, [friends, search, sorting])



  return (
    <div className="card card-flush h-100 mb-5 mb-xl-10 rounded-0 rounded-start-1">
      <div className="card-header">
        <div className="card-title">
          <AccountLong data={my_account} color={"danger"} />
        </div>
        <div className="card-toolbar">
          <Link to={"/sign-out"} className="btn btn-icon btn-sm" title="Sign out" >
            <i className="bi bi-box-arrow-right text-danger fw-bold fs-2x"></i>
          </Link>
        </div>
      </div>
      <div className="card-body d-flex flex-column justify-content-between p-0">
        <div className="my-contact border-top">
          <div className="filters p-5 border-bottom d-flex align-items-center">
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
            <ButtonIcon title={`Sorting ${sorting.order}`} onAction={() => toggleSorting('fullname')}>
              <i className={"bi fw-bold fs-2x " + ((sorting.order === "desc") ? "bi-sort-down" : (sorting.order === "asc" ? "bi-sort-up" : "bi-filter"))}></i>
            </ButtonIcon>
          </div>
          <div className="friends">
            {Object.values(ResultData).length > 0 ? (
              ResultData.map((v, index) => (
                <div className={"friend-item border-bottom py-3 px-5 bg-hover-light-primary cursor-pointer " + (selectedUser.id === v.id ? "bg-light-primary" : "")} key={index} onClick={() => HandlerSelectedChat(v)}>
                  <AccountLong data={v} color={"info"} />
                </div>
              ))
            ) : "No Data Found!"}

          </div>
        </div>
        <p className="fs-8 text-center mb-0 py-3">
          <i className="bi bi-lock-fill"></i>
          <span className="ms-1">Your personal messages are <span className="text-info">end-to-end encrypted</span></span>
        </p>
      </div>
    </div>
  );
}
