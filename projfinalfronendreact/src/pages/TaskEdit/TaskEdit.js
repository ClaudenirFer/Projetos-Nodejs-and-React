import React, { useEffect, useState } from "react";
import { Api } from '../../api/api';
import '../../style/style.scss';
import './TaskEdit.scss'

const TaskEdit = (props) => {
    const id = props.match.params.id;
    const [fields, setFields] = useState({});
    

    useEffect(() => {
      getTaskById();
    },[])
  
    const getTaskById = async () => {
      const response = await Api.fetchGetById(id);
      const data = await response.json();
      setFields(data);
    }
  
    const handleFieldsChange = (event) => {
      const auxFields = { ...fields };
      auxFields[event.target.name] = event.target.value;
      setFields(auxFields);
      
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = { ...fields };    
      const result = await Api.fetchPut(data, id);
      props.history.push('/')
      const response = await result.json();
         
    }

    

    return (
        <section className="add">
            <h1> Editar Tarefa </h1>
            <form className="add-form" onSubmit={handleSubmit}>
                <div className="add-form-group">                    
                    <label htmlFor="task" className="add-form-group-label"> Tarefa: </label>
                    <input type="text" id="task" name="task" value={fields.task} onChange={handleFieldsChange} className="add-form-group-input"/>
                </div>
                <div className="add-form-group">
                    <label htmlFor="description" className="add-form-group-label"> Descrição: </label>
                    <input type="text" id="description" name="description" value={fields.description} onChange={handleFieldsChange} className="add-form-group-input"/>
                </div>
                    <div className="add-form-group">
                    <label htmlFor="priorities" className="add-form-group-label"> Prioridade: </label>
                    <input type="text" id="priorities" name="priorities" value={fields.priorities} onChange={handleFieldsChange} className="add-form-group-input"/>
                </div>
                <div className="add-form-group">
                    <label htmlFor="taskStaus" className="add-form-group-label"> Status: </label>
                    <input type="text" id="taskStaus" name="taskStaus" value={fields.taskStaus} onChange={handleFieldsChange} className="add-form-group-input"/>
                </div>
                <div className="add-form-group">
                    <label htmlFor="deadline" className="add-form-group-label"> Prazo </label>
                    <input type="text" id="deadline" name="deadline" value={fields.deadline} onChange={handleFieldsChange} className="add-form-group-input"/>
                </div>
                
                <div className="add-form-buttons">
                    
                      <button className="add-form-buttons-btn-cancelar"> Cancelar </button>
                    
                    
                      <button  className="add-form-buttons-btn-salvar" type="submit"> Salvar </button>
                   

                </div>
            </form> 
        </section>
    )
}

export default TaskEdit
