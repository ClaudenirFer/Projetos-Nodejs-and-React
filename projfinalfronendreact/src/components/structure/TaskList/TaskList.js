import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.scss";
import { Api } from "../../../api/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  
  const getTask = async () => {
    const response = await Api.fetchGet();
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="list">
      {tasks.map((task, index) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TaskList;
