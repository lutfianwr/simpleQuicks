import React from "react";
import "../styles/modal.scss";
import Loading from "./Loading";
import Task from "./Task";
import TaskForm from "./TaskForm";

const Modal = (props) => {
  const handleNewTask = () => {
    let taskForm = document.getElementById("task_form");
    taskForm.style.display = "block";
  };

  return (
    <div id="task_modal" className="modal">
      <div className="modal_content">
        <div className="task_header">
          <select type="select">
            <option value="none" disabled defaultValue={"mytask"} hidden>
              My Tasks
            </option>
            <option value="au">Personal Errands</option>
            <option value="ca">Urgent To-Do</option>
          </select>
          <button className="new_task" onClick={() => handleNewTask()}>
            New Task
          </button>
        </div>
        <TaskForm getData={props.getData}></TaskForm>
        <div className="task_content">
          {props.loading ? (
            <Loading tag="Loading Task List..." />
          ) : (
            props.data.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.content}
                  description={task.description}
                  due={task.due.date}
                  completed={task.completed}
                  getData={props.getData}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
