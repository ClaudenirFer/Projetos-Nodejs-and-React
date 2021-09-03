import React from "react";
import './App.css';

import Title from "./components/Title"
import Card from "./components/layout/Card";
import Paragraph from "./components/Paragraph";

import Button from './components/Button'

export default (props) => (
    <div className="App">
        <section id="init">
            <Title></Title>
        </section>

        <Paragraph></Paragraph> 

        <Card titulo="Carros de Polícia espalhados pelo mundo" head="Carros de Polícia">  

            <Button name="Proximo"/>
        </Card>
        
        
        
        <footer> 
            Todos os direitos reservados a Claudenir Ferreira <br/> Copyright 2021             
        </footer>
        
    </div>
)