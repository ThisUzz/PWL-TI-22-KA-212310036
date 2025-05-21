import React, { useState } from "react";

const states = {
    setState: null,
    changeState(data) {
        if (!this.setState) return;
        this.setState((prevData) => {
            return {
                ...prevData,
                ...data,
            };
        });
    },
};
const AlertNotif = ({ color, message, icon }) => {
    const [data, setData] = useState({
        tipe: (color) ? color : "danger",
        message: (message) ? message : "message",
        icon: (icon) ? icon : "bi-exclamation-triangle",
    });

    states.setState = setData;

    return (
        <div
            className={
                "notice d-flex bg-light-" +
                data.tipe +
                " rounded border-" +
                data.tipe +
                " border border-dashed mb-9 p-6 "
            }
            id="alert-info"

        >
            <span className="me-4">
                <i className={"fs-1 text-" + data.tipe + " bi " + data.icon}></i>
            </span>
            <div className="d-flex flex-stack flex-grow-1">
                <div className="fw-bold">
                    <div className="fs-6 text-gray-700">{data.message}</div>
                </div>
            </div>
        </div>
    );
}

export {AlertNotif}