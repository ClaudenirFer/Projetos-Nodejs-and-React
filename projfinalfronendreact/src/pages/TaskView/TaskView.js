import React, { useEffect, useState } from "react";
import "./TaskView.scss";
import { Api } from "../../api/api";
import { Link } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const TaskView = (props) => {
  const [task, setTask] = useState({});
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    getTaskById();
  });

  const id = props.match.params.id;

  const getTaskById = async () => {
    const response = await Api.fetchGetById(id);
    const data = await response.json();
    setTask(data);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const answer = await Api.fetchDelete(id);
    const result = await answer;
    props.history.push("/");
    
  }

  return (
    <section className="view">
      <div className="view-img">
        <img src="https://via.placeholder.com/350x350" alt="PlaceHolder"></img>
      </div>

      <div className="view-info">
        <p className="view-info-text"> Tarefa: {task.task} </p>
        <p className="view-info-text"> Descrição: {task.description}</p>
        <p className="view-info-text"> Prioridade: {task.priorities} </p>
        <p className="view-info-text"> Status: {task.taskStaus} </p>
        <p className="view-info-text"> Prazo: {task.deadline} </p>
        <p className="view-info-text"> Data de Criação: {task.creationDate} </p>
        <Link to={`/edit/${task._id}`}>
          <button className="btn btn-sucess"> Editar </button>
        </Link>
        <button className="btn btn-danger" onClick={onOpenModal}>Excluir</button>
      </div>
      <Modal open={open} onClose={onCloseModal} center
        classNames={{
          overlayAnimationIn: 'customEnterOverlayAnimation',
          overlayAnimationOut: 'customLeaveOverlayAnimation',
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
        }}
      >
        <h2> Excluir esta tarefa? </h2>
        <button onClick={handleDelete} className="buttons"> SIM </button>
        <button onClick={onCloseModal} className="buttons"> NAO </button>
      </Modal>
    </section>
  )
}

export default TaskView