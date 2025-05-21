import React from "react";
import axios from "axios";
import { openModal } from "../components/ModalPopUp";

const middleware_uri = process.env.REACT_APP_MIDDLEWARE_URL;

const headerApp = {
  "app-env": "pwl-chat",
  "app-id": "123456789",
  "Content-Type": "application/json",
};

const POST_SIGN_IN = (param, setSignin) => {
  setSignin({ loading: true, data: [], message: "" });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: middleware_uri + "/api/user/signin",
    headers: headerApp,
    data: JSON.stringify(param),
  };

  axios
    .request(config)
    .then((response) => {
      const result = response.data.data;
      if (result) {
        localStorage.setItem("user_account", JSON.stringify(result));
        setSignin({
          loading: false,
          data: response.data,
          message: "Successfully sign in, please wait for a moment..",
        });
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        setSignin({
          loading: false,
          data: [],
          message:
            "Invalid Grant (Incorrect Credential. Please check username & password)",
        });
      }
    })
    .catch((error) => {
      setSignin({ loading: false, data: [], message: error.message });
    });
};

const FETCH_CONTACT_CHAT = (setContact) => {
  setContact({ loading: true, data: [], message: "" });
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: middleware_uri + "/api/user/fetch-all",
    headers: headerApp,
  };

  axios
    .request(config)
    .then((response) => {
      const result = response.data.data;
      if (result) {
        setContact({ loading: false, data: result, message: "" });
      } else {
        setContact({
          loading: false,
          data: [],
          message:
            "Unable to establish a connection to the server. Please try again later.",
        });
      }
    })
    .catch((error) => {
      setContact({ loading: false, data: [], message: error.message });
    });
};

const GET_SELECTED_CHAT = (param, setChat, setMyChat) => {
  setChat({ loading: true, data: [], message: "" });setMyChat("");
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: middleware_uri + "/api/msg/selected-chat",
    headers: headerApp,
    data: JSON.stringify(param),
  };

  axios
    .request(config)
    .then((response) => {
      const result = response.data.data;
      if (result) {
        setMyChat(result);
        setChat({ loading: false, data: result, message: "" });
      } else {
        setMyChat("");
        setChat({
          loading: false,
          data: [],
          message:
            "Unable to establish a connection to the server. Please try again later.",
        });
      }
    })
    .catch((error) => {
      setMyChat("");
      setChat({ loading: false, data: [], message: error.message });
    });
};

const SEND_CHAT = (param, setChat) => {
  setChat({ loading: true, data: [], message: "" });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: middleware_uri + "/api/msg/create",
    headers: headerApp,
    data: JSON.stringify(param),
  };

  axios
    .request(config)
    .then((response) => {
      const result = response.data.data;
      if (result) {
        setChat({ loading: false, data: result, message: "" });
      } else {
        setChat({
          loading: false,
          data: [],
          message:
            "Unable to establish a connection to the server. Please try again later.",
        });
      }
    })
    .catch((error) => {
      setChat({ loading: false, data: [], message: error.message });
    });
};

const REMOVE_CHAT = (param) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: middleware_uri + "/api/msg/delete",
    headers: headerApp,
    data: JSON.stringify(param),
  };

  axios
    .request(config)
    .then((response) => {
      const result = response.data.message;
      const resultCode = response.data.status;
      if(resultCode !== 200){
        alert(result);
      }
      openModal({open:false});
    })
    .catch((error) => {
      alert(error.message);
    });
};

export { POST_SIGN_IN, FETCH_CONTACT_CHAT, GET_SELECTED_CHAT, SEND_CHAT, REMOVE_CHAT };
