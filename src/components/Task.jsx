import React from "react";
import { useState } from "react";
import "../styles/task.scss";

const Task = (props) => {
  const [active, setActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleExpand = () => {
    active ? setActive(false) : setActive(true);
  };
  const handleExpandDelete = () => {
    deleteActive ? setDeleteActive(false) : setDeleteActive(true);
  };

  const handleComplete = () => {
    completed ? setCompleted(false) : setCompleted(true);
  };

  const handleDelete = () => {
    fetch(`https://api.todoist.com/rest/v1/tasks/${props.id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }).then(() => props.getData());
  };

  const getDueDates = (input) => {
    const date1 = new Date("10/28/2022");
    const date2 = new Date(input);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return diffDays + " Days Left";
    } else {
      return "Overdue";
    }
  };

  return (
    <div className="task_component">
      <div className="task_nav">
        <div className="left">
          <input type="checkbox" onChange={() => handleComplete()}></input>
          <p
            className="title"
            style={
              completed
                ? { textDecoration: `line-through` }
                : { textDecoration: `none` }
            }
          >
            {props.title}
          </p>
        </div>
        <div className="right">
          <p className="date_remain">{getDueDates(props.due)}</p>
          <p className="date">{props.due}</p>
          <button
            className={`exp ${active ? "expanded" : ""}`}
            onClick={() => handleExpand()}
          ></button>

          <button onClick={() => handleExpandDelete()} id="delete">
            <svg
              width="14"
              height="4"
              viewBox="0 0 14 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                fill="#828282"
              />
            </svg>
          </button>

          <button
            id="delete"
            className={`delete ${deleteActive ? "expanded" : ""}`}
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
      <div id="task_detail" className={`task_detail ${active ? "active" : ""}`}>
        <div className="date">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99181 0.666626C4.39181 0.666626 0.666809 4.39996 0.666809 8.99996C0.666809 13.6 4.39181 17.3333 8.99181 17.3333C13.6001 17.3333 17.3335 13.6 17.3335 8.99996C17.3335 4.39996 13.6001 0.666626 8.99181 0.666626ZM9.0003 15.6666C5.31697 15.6666 2.33364 12.6833 2.33364 8.99996C2.33364 5.31662 5.31697 2.33329 9.0003 2.33329C12.6836 2.33329 15.667 5.31662 15.667 8.99996C15.667 12.6833 12.6836 15.6666 9.0003 15.6666ZM8.16681 4.83329H9.41681V9.20829L13.1668 11.4333L12.5418 12.4583L8.16681 9.83329V4.83329Z"
              fill="#2F80ED"
            />
          </svg>
          <input type="date" readOnly={props.due} value={props.due}></input>
        </div>
        <div className="detail">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2165 0C12.0082 0 11.7915 0.0833333 11.6332 0.241667L10.1082 1.76667L13.2332 4.89167L14.7582 3.36667C15.0832 3.04167 15.0832 2.51667 14.7582 2.19167L12.8082 0.241667C12.6415 0.075 12.4332 0 12.2165 0ZM9.21667 5.01667L9.98333 5.78333L2.43333 13.3333H1.66667V12.5667L9.21667 5.01667ZM0 11.875L9.21667 2.65833L12.3417 5.78333L3.125 15H0V11.875Z"
              fill="#2F80ED"
            />
          </svg>

          <p>{props.description ? props.description : "no description"}</p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Task;
