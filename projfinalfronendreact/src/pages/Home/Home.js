import React from 'react';
import './Home.scss'
import TaskList from '../../components/structure/TaskList/TaskList';

const Home = () => {
    return (
        <section className="content">
            <h1 className="content-title"> listagem da música </h1>
            <div className="content-list">

               <TaskList />
               
            </div>
        </section>
    )
}

export default Home