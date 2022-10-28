import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/modal.scss";
import Task from "./Task";

const Modal = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await fetch(`https://api.todoist.com/rest/v1/tasks`, {
      headers: {
        Authorization: `Bearer 8845c7d100a662743d705c1c0aaf4150bb1a226d`,
      },
    })
      .then((response) => response.json())
      // .then((res) => console.log(res));
      .then((res) => setData(res));
    // .then((response) => console.log(response));
    // .finally(console.log(data));
    // .finally(sortData());
  };

  const sortData = () => {
    let sortedData = data.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(sortedData);
  };

  return (
    <div id="modal" className="modal">
      <div className="modal_content">
        <div className="task_header">
          <select type="select">
            <option value="none" disabled selected hidden>
              My Tasks
            </option>
            <option value="au">Personal Errands</option>
            <option value="ca">Urgent To-Do</option>
          </select>
          <button className="new_task" onClick={() => fetchData()}>
            New Task
          </button>
        </div>
        <div className="task_content">
          {data.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.content}
                description={task.description}
                due={task.due.date}
                completed={task.completed}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Modal;
