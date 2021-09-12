import React, { useEffect, useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.scss';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  const url = 'http://localhost:3001/tasks';

  const getTask = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="list">
      {tasks.map((task, index) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
};

export default TaskList;
