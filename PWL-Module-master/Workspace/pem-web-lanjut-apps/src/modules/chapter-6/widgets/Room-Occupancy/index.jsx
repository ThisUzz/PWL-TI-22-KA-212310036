import React, { useState } from "react";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function RoomOccupancy() {
  const now = Moment();
  const objparam = { start_dt: now.toDate(), end_dt: now.toDate(), floor: 0 };
  const [room, setRoom] = useState(objparam);

  const rooms = [
    { id: 1, room: "101", floor: 1 },
    { id: 2, room: "101", floor: 1 },
    { id: 3, room: "201", floor: 2 },
    { id: 4, room: "202", floor: 2 },
    { id: 5, room: "203", floor: 2 },
    { id: 6, room: "301", floor: 1 },
    { id: 7, room: "302", floor: 3 },
    { id: 8, room: "303", floor: 3 },
    { id: 9, room: "304", floor: 3 },
    { id: 10, room: "105", floor: 3 },
  ];

  const schdRoomRent = [
    {
      id: 1,
      room_id: 6,
      event: "Miting prodi",
      start_dt: "2024-06-22 08:00:00",
      end_dt: "2024-06-22 10:00:00",
    },
    {
      id: 2,
      room_id: 8,
      event: "Pem Web Lanjut",
      start_dt: "2024-06-22 15:45:00",
      end_dt: "2024-06-22 18:30:00",
    },
    {
      id: 3,
      room_id: 5,
      event: "Lab Pem Web Lanjut",
      start_dt: "2024-06-18 10:00:00",
      end_dt: "2024-06-18 13:30:00",
    },
  ];

  const HandlerEndDate = (date) => {
    if (date < room.start_dt) {
      alert("End date is bigger than start date.");
      setRoom({ ...room, end_dt: room.start_dt });
    } else {
      setRoom({ ...room, end_dt: date });
    }
  };

  const [roomOccupancy, setRoomOccupancy] = useState([]);

  const FindRoomOccupancy = (e) => {
    e.preventDefault();
    const results = rooms.map((item) => {
      const has_schd = schdRoomRent.filter((v) => v.room_id === item.id);
      item.room_occupancy = has_schd;
      return item;
    });
    setRoomOccupancy(results);
  };
  return (
    <div id="room-occupancy">
      <form method="post" autoComplete="off">
        <h3>Filter:</h3>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Start Date</label>
            <DatePicker
              className="form-control pe-10"
              dateFormat={"yyyy-MM-dd hh:mm aa"}
              isClearable
              showTimeSelect
              timeIntervals={10}
              placeholderText="Enter date"
              selected={room.start_dt}
              onChange={(date) =>
                setRoom({ ...room, start_dt: date, end_dt: date })
              }
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">End Date</label>
            <DatePicker
              className="form-control pe-10"
              dateFormat={"yyyy-MM-dd hh:mm aa"}
              isClearable
              showTimeSelect
              timeIntervals={10}
              placeholderText="Enter date"
              selected={room.end_dt}
              onChange={(date) => HandlerEndDate(date)}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Floor</label>
            <select name="floor" className="form-select">
              <option value="">Choose one</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>
          </div>
        </div>
        <div className="text-center my-5">
          <div className="btn-group">
            <button className="btn btn-light" type="button">
              Clear
            </button>
            <button className="btn btn-primary" type="button">
              Search
            </button>
          </div>
        </div>
      </form>

      <div id="list-room">
        <h3>List of room occupancy:</h3>
        <div className="row">
          {Object.values(roomOccupancy).length > 0 ? (
            roomOccupancy.map((v, index) => (
              <div className="col-4 bg-light rounded p-5 mx-2 my-2" key={index}>
                <span className="d-block">Room {v.room}</span>
                <span className="d-block">Floor {v.floor}</span>
              </div>
            ))
          ) : (
            <p className="text-center">No room founded</p>
          )}
        </div>
      </div>
    </div>
  );
}
