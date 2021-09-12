import React from "react";
import "./TaskCard.scss";

const TaskCard = (props) => {
    const task = props.task;
  return (
    <div className="card">
      <div className="card-img">
        <img src="https://picsum.photos/300/300?random" alt="" />
      </div>

      <p className="card-text"> {task.title} </p>
      <span className="card-info"> Testando </span>
    </div>
  );
};

export default TaskCard;
