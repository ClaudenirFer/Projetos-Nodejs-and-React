import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.scss';

const TaskCard = (props) => {
    const task = props.task;
  return (
        
    <Link to={`/view/${task._id}`} className="card">
      
      <div>
      
        <div className="card-img">        
          
        </div>

        <p className="card-text"> {task.task} </p>
        <p className="card-text"> {task.description} </p>
        <span className="card-info"> Detalhes </span>
      </div>
    </Link>
  );
};

export default TaskCard;
