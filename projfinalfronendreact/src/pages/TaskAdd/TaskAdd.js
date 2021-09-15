import React from 'react';
import '../../style/style.scss';
import './TaskAdd.scss';
import { Api } from '../../api/api';

const TaskAdd = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = event.target.task.value;
    const description = event.target.description.value;
    const priorities = event.target.priorities.value;
    const taskStaus = event.target.taskStaus.value;
    const deadline = event.target.deadline.value;

    const Task = {
      task: task,
      description: description,
      priorities: priorities,
      taskStaus: taskStaus,
      deadline: deadline,
    };

    try {
      const response = await Api.fetchPost(Task);
      const data = await response;
      props.history.push("/");
    } catch (error) {}
  };

  return (
    <section className="add">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-form-group">
          <label htmlFor="task" className="add-form-group-label">
            {" "}
            Tarefa:{" "}
          </label>
          <input
            type="text"
            id="task"
            name="task"
            className="add-form-group-input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="description" className="add-form-group-label">
            {" "}
            Descrição:{" "}
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="add-form-group-input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="priorities" className="add-form-group-label">
            {" "}
            Prioridade:{" "}
          </label>
          <input
            type="text"
            id="priorities"
            name="priorities"
            className="add-form-group-input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="taskStaus" className="add-form-group-label">
            {" "}
            Status:{" "}
          </label>
          <input
            type="text"
            id="taskStaus"
            name="taskStaus"
            className="add-form-group-input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="deadline" className="add-form-group-label">
            {" "}
            Prazo{" "}
          </label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            className="add-form-group-input"
          />
        </div>

        <div className="add-form-buttons">
          <button className="add-form-buttons-btn-cancelar"> Cancelar </button>
          <button className="add-form-buttons-btn-salvar" type="submit">
            {" "}
            Salvar{" "}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskAdd;
